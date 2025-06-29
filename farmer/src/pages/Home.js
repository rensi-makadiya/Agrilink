import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-overlay"></div> {/* Blur overlay */}
      <div className="home-content">
        <div className="home-card">
          <h2>Welcome to AgriLink Platform</h2>
          <div className="home-buttons">
            <button onClick={() => navigate('/add-crop')} className="home-button">
              ➕ Add Crop
            </button>
            <button onClick={() => navigate('/my-crops')} className="home-button">
              🌾 My Crops
            </button>
            <button onClick={() => navigate('/farmer/orders')} className="home-button">
              📦 Farmer Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
