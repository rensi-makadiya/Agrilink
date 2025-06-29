import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Crops() {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await API.get('/crops');
      setCrops(res.data);
    } catch (err) {
      alert('Failed to load crops');
    }
  };

  return (
    <div className="admin-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>All Listed Crops</h2>
      {crops.length === 0 ? (
        <p>No crops found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Seller</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop._id}>
                <td>{crop.name}</td>
                <td>₹{crop.price}</td>
                <td>{crop.quantity} kg</td>
                <td>{crop.location}</td>
                <td>{crop.ownerEmail}</td>
                <td>{crop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Crops;
