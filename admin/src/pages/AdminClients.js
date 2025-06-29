import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminClients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get('/admin/clients');
      setClients(res.data);
    } catch (err) {
      alert('Failed to load clients');
    }
  };

  const deleteClient = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this client?');
    if (!confirm) return;

    try {
      await API.delete(`/admin/clients/${id}`);
      setClients((prev) => prev.filter(c => c._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>All Registered Clients</h2>
      {clients.length === 0 ? (
        <p>No clients found</p>
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
            {clients.map(client => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  <button onClick={() => deleteClient(client._id)} className="delete-btn">
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

export default AdminClients;
