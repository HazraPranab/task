import './App.css';
import CreateBid from './Auction/Create';
import ViewTableComponent from './Auction/View';
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
