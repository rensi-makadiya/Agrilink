import React, { useState } from 'react';
import { API } from '../api';
import './AddCrop.css';
import { useNavigate } from 'react-router-dom';

function AddCrop() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
    ownerEmail: '',
    location: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = e => {
    setCrop({ ...crop, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(crop).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await API.post('/crop/add-crop', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Upload Error:", err);
      alert('Failed to upload');
    }
  };

  return (
    <div className="add-crop-wrapper">
      {/* ✅ Header with back button */}
      <div className="add-crop-header">
       <button onClick={() => navigate(-1)} className="back-button-top">← Back To Home</button>

     
      </div>

      <form onSubmit={handleSubmit}>
           <h2 className="form-title">Add Crop</h2>
        <input type="text" name="name" placeholder="Crop Name" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
        <input type="email" name="ownerEmail" placeholder="Your Email" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;
