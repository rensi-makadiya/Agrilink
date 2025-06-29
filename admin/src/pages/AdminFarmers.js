// src/pages/AdminFarmers.js
import React, { useEffect, useState } from 'react';
import { API } from '../api';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
function AdminFarmers() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);
  const navigate = useNavigate();
  const fetchFarmers = async () => {
    try {
      const res = await API.get('/admin/farmers'); // ✅ working with /api in baseURL
      setFarmers(res.data);
    } catch (err) {
      console.error('Failed to load farmers', err);
      alert('Failed to load farmers');
    }
  };

  const deleteFarmer = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this farmer?');
    if (!confirm) return;

    try {
      await API.delete(`/admin/farmers/${id}`);
      setFarmers((prev) => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-container">
         <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>All Registered Farmers</h2>
      {farmers.length === 0 ? (
        <p>No farmers found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map(farmer => (
              <tr key={farmer._id}>
                <td>{farmer.name}</td>
                <td>{farmer.email}</td>
                <td>
                  <button onClick={() => deleteFarmer(farmer._id)} className="delete-btn">
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminFarmers;
