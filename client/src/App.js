

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AllCrops from './pages/AllCrops';
import ClientOrderPage from './pages/ClientOrderPage';
import ClientOrderStatus from './pages/ClientOrderStatus';

function App() {
   
  return (
    
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
       <Route path="/client" element={<Home />} />
       <Route path="/order" element={<ClientOrderPage />} />

       <Route path="/my-orders" element={<ClientOrderStatus />} />
{/* <Route path="/chat" element={<ClientChatPage senderEmail={senderEmail} receiverEmail={receiverEmail} />} /> */}
    

       <Route path="/all-crops" element={<AllCrops />} />
      </Routes>
    </Router>
  );
}

export default App;
