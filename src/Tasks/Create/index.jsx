import React, { useState } from 'react';
// Import the CSS file
import './create.css'; 
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreateBid() {
    const location = useLocation();
     const data = location.state;
     
    // React.useEffect(() => {
    //     if (route.params?.id) {
    //         console.log(route.params?.id)
    //       // Post updated, do something with `route.params.post`
    //       // For example, send the post to the server
    //     }
    //   }, [route.params?.id]);

    const initialRows = [
        {
          id: 1,
          title: 'Car',
          description: '4 Wheeler',
          minbid: 100000,
          enddate: new Date(),
          maxbid: 150000,
          bid: 0,
        },
        {
          id: 2,
          title: 'Bike',
          description: '2 Wheeler',
          minbid: 30000,
          enddate: new Date(),
          maxbid: 34000,
          bid:0
        }
      ];

  const obj= initialRows.filter(x=> x.id == data)[0]
  const [formData, setFormData] = useState({
    title: obj.title,
    description: obj.description,
    minbid: obj.minbid,
    enddate: Date(),
    maxbid: obj.maxbid,
    bid: obj.bid
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    if(formData.bid < formData.minbid || formData.bid < formData.maxbid )
    { 
      setErrorMessage("Can't Place bid less than starting bid or maximum bid")
      return;
    }
    else
    {
      setSuccessMessage("Bid Placed Successfully !!")
      let path = `/view-auction`; 
      navigate(path);
    }
  };

  return (
    <div className="form-container">
      <h2>Place Bid</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            disabled
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            name="description"
            disabled
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bid">Starting Bid</label>
          <input
            type="number"
            id="minbid"
            name="minbid"
            min={0}
            value={formData.minbid}
            disabled
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxbid">Max. Bid</label>
          <input
           
            id="maxbid"
            name="maxbid"
            disabled
            value={formData.maxbid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bid">Enter your Bid</label>
          <input
            type="bid"
            id="bid"
            name="bid"
            value={formData.bid}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
}

export default CreateBid;