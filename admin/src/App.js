import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminCrops from './pages/Crops';
import Home from './/pages/Home';
import AdminFarmers from './pages/AdminFarmers';
import AdminClients from './pages/AdminClients'; 
import AdminOrders from './pages/AdminOrders';
function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />
         <Route path="/home" element={<Home />} />
        {/* Add routes like /admin, /farmer, /client if needed */}
          <Route path="/admin/crops" element={<AdminCrops />} />
       <Route path="/admin/farmers" element={<AdminFarmers />} />
      <Route path="/admin/clients" element={<AdminClients />} />
      <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>
    </Router>
  );
}

export default App;
