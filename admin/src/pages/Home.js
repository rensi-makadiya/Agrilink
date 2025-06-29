import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin 👨‍💼</h2>
      <div className="admin-buttons">
        <button onClick={() => navigate('/admin/farmers')}>👨‍🌾 Farmers</button>
        <button onClick={() => navigate('/admin/clients')}>👥 Clients</button>
        <button onClick={() => navigate('/admin/crops')}>🌾 Crops</button>
        <button onClick={() => navigate('/admin/orders')}>📦 Orders</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
