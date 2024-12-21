import './App.css';
import CreateBid from './Tasks/Create';
import ViewTableComponent from './Tasks/View';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<ViewTableComponent />}/> 
        <Route path="/place-bid" element={<CreateBid />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
