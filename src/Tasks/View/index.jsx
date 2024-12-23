import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import './view.css';
import useFetch from '../../Service/useFetch';
import { getUrl, insertUrl, updateUrl, deleteUrl } from '../../Service/ApiService';
import { useSnackbar } from 'notistack';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 0;
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '' , priority: 0, status: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id' }
    }));
  };

  

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      
    </GridToolbarContainer>
  );
}

export default function ViewTableComponent() {
  const { enqueueSnackbar } = useSnackbar();
  const [success, setisSuccess] = React.useState();
  const [data]= useFetch(getUrl, success);
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  
  React.useEffect(()=> {
    setRows(data)
  },[data])

  // console.log(localStorage.getItem("LoggedinUser"))
  
 

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  
  
  const handleSaveClick = (id) => () => {
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  
  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteData(id)
  };



  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const insertData = (newrow) => {   
     let body= JSON.stringify({
        id: newrow.id,
        name: newrow.name,
        priority: newrow.priority,
        status: newrow.status
    })
    fetch(insertUrl, {
        method: 'post',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
        body: body
    }).then((res) => {res.json();
      if(res.status != 200)
      {
        setisSuccess(false);
        enqueueSnackbar("Some error occured" , { variant: 'error' })
        
      }
      else
      {
        setisSuccess(true);
        enqueueSnackbar("Success !", { variant: 'success' })
        
      }})
    
  }

  const updateData = (newrow) => {   
    let body= JSON.stringify({
       id: newrow.id,
       name: newrow.name,
       priority: newrow.priority,
       status: newrow.status
   })
   fetch(updateUrl, {
       method: 'put',
       headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
       body: body
   }).then((res) => {res.json();
      if(res.status != 200)
      {
        setisSuccess(false);
        enqueueSnackbar("Save failed !" , { variant: 'error' })
      }
      else
      {
        setisSuccess(true);
        enqueueSnackbar("Success !", { variant: 'success' });
        
      }})
      .catch(() => enqueueSnackbar("Some error occured" , { variant: 'error' }));
   
 }

 const deleteData = (id) => {   
 fetch(`${deleteUrl}/${id}`, {
     method: 'delete',
     headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
 }).then((res) => {
  if(res.status != 200)
  {
    enqueueSnackbar("Some error occured" , { variant: 'error' })
    setisSuccess(false);
  }
  else
  {
    enqueueSnackbar("Success !", { variant: 'success' });
    setisSuccess(true);
  }})
 
}

  const processRowUpdate = (newRow) => {
    if(newRow?.isNew == true)
    {
      insertData(newRow);
      
    }
    else
      updateData(newRow)
  
    
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
   
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 680, editable: true },
    {
      field: 'priority',
      headerName: 'Priority',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      require: true
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Not Started', 'In Progress', 'Completed'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 200,
      
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}