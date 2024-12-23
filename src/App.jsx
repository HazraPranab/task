import './App.css';
import ViewTableComponent from './Tasks/View';
import ErrorPage from './Tasks/errorPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<ViewTableComponent />}/> 
        <Route path='/error' element= {<ErrorPage/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
