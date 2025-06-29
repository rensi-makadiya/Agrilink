import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import './MyCrops.css';

function MyCrops() {
  const [crops, setCrops] = useState([]);
  const [editingCrop, setEditingCrop] = useState(null);
  const navigate = useNavigate();
  const farmerEmail = localStorage.getItem("farmerEmail");

  useEffect(() => {
    const fetchMyCrops = async () => {
      if (!farmerEmail) {
        alert("Farmer email not found. Please login again.");
        return;
      }

      try {
        const res = await API.get(`/crop/by-farmer/${farmerEmail}`);
        setCrops(res.data);
      } catch {
        alert("Failed to load crops.");
      }
    };

    fetchMyCrops();
  }, [farmerEmail]);

  const handleInputChange = (e) => {
    setEditingCrop({ ...editingCrop, [e.target.name]: e.target.value });
  };

  const handleEditClick = (crop) => setEditingCrop(crop);

  const handleSave = async () => {
    try {
      await API.put(`/crop/update/${editingCrop._id}`, editingCrop);
      alert("✅ Crop updated!");
      setEditingCrop(null);
      const res = await API.get(`/crop/by-farmer/${farmerEmail}`);
      setCrops(res.data);
    } catch {
      alert("❌ Update failed");
    }
  };

  const handleDelete = async (cropId) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      try {
        await API.delete(`/crop/delete/${cropId}`);
        alert("🗑️ Crop deleted!");
        const res = await API.get(`/crop/by-farmer/${farmerEmail}`);
        setCrops(res.data);
      } catch {
        alert("❌ Delete failed");
      }
    }
  };

  return (
    <div className="mycrops-container">
      <button onClick={() => navigate(-1)} className="back-button-top">← Back To Home</button>
      <h2 className="mycrops-title">🌾 My Uploaded Crops</h2>

      <div className="crops-grid">
        {crops.length === 0 ? (
          <p className="no-crops-text">No crops found.</p>
        ) : (
          crops.map(crop => (
            <div key={crop._id} className="crop-card">
              <img
                src={`http://localhost:5001/uploads/${crop.image}`}
                alt={crop.name}
                className="crop-image"
              />
              {editingCrop?._id === crop._id ? (
                <>
                  <input name="name" value={editingCrop.name} onChange={handleInputChange} />
                  <input name="price" value={editingCrop.price} onChange={handleInputChange} />
                  <input name="quantity" value={editingCrop.quantity} onChange={handleInputChange} />
                  <input name="description" value={editingCrop.description} onChange={handleInputChange} />
                  <input name="location" value={editingCrop.location} onChange={handleInputChange} />
                  <button className="save-btn" onClick={handleSave}>💾 Save</button>
                </>
              ) : (
                <>
                  <h3>{crop.name}</h3>
                  <p><strong>₹ {crop.price}</strong></p>
                  <p>{crop.quantity} kg</p>
                  <p>{crop.description}</p>
                  <p>{crop.location}</p>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEditClick(crop)}>✏️ Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(crop._id)}>🗑️ Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyCrops;
