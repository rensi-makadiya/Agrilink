import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import './AllCrops.css'; // Link the CSS

function AllCrops() {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await API.get('/crop/all');
        setCrops(res.data);
      } catch (err) {
        console.error("Failed to fetch crops", err);
      }
    };

    fetchCrops();
  }, []);

  const handleBuy = (crop) => {
    navigate('/order', { state: { crop } });
  };

  return (
    <div className="allcrops-container">
      <button className="back-button" onClick={() => navigate('/client')}>← Back to Home</button>

      <h2 className="page-title">All Available Crops</h2>
      <div className="crops-grid">
        {crops.map(crop => (
          <div key={crop._id} className="crop-card">
            <img
              src={`http://localhost:5001/uploads/${crop.image}`}
              alt={crop.name}
              className="crop-image"
            />
            <h3>{crop.name}</h3>
            <p><strong>Price:</strong> ₹{crop.price}</p>
            <p><strong>Quantity:</strong> {crop.quantity} kg</p>
            <p><strong>Location:</strong> {crop.location}</p>
            <p><strong>Description:</strong> {crop.description}</p>
            <p><strong>Seller:</strong> {crop.ownerEmail}</p>
            <button className="buy-button" onClick={() => handleBuy(crop)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCrops;
