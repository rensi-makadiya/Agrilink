import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function ClientHome() {
  const navigate = useNavigate();

  return (
    <div className="client-home-container">
      <div className="client-home-box">
        <h2>Welcome to AgriLink Platform</h2>
        <button onClick={() => navigate('/all-crops')}>🌾 All Crops</button>
      
        <button onClick={() => navigate('/my-orders')}>📦  My Order Status</button>
      </div>
    </div>
  );
}

export default ClientHome;
