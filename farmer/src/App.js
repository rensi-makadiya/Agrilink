import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import AddCrop from './pages/AddCrop';
import Home from './pages/Home';
import MyCrops from './pages/MyCrop';

import FarmerOrders from './pages/FarmerOrder';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/farmer" element={<Home />} />
        <Route path="/my-crops" element={<MyCrops />} />
        <Route path="/farmer/orders" element={<FarmerOrders />} />
       
      </Routes>
    </Router>
  );
}

export default App;
