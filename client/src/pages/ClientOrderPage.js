import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientOrderPage.css';

function ClientOrderPage() {
  const [crops, setCrops] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const buyerEmail = localStorage.getItem('clientEmail');
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCrop = location.state?.crop;

  useEffect(() => {
    if (selectedCrop) {
      setCrops([selectedCrop]);
    } else {
      API.get('/crop/all').then(res => setCrops(res.data));
    }
  }, [selectedCrop]);

  const handleOrder = async (crop) => {
    const qty = quantity[crop._id];
    if (!qty || qty <= 0) return alert("Enter valid quantity");
    if (!deliveryLocation) return alert("Please enter delivery location");

    try {
      await API.post('/orders/place', {
        cropId: crop._id,
        buyerEmail,
        quantity: qty,
        deliveryLocation,
      });
      alert("Order placed!");
      setDeliveryLocation('');
      setQuantity({ ...quantity, [crop._id]: '' });
    } catch (err) {
      alert("Failed to place order");
    }
  };

  return (
    <div className="order-container">
     <button className="back-button" onClick={() => navigate('/all-crops')}>⬅ Back</button>

      <h2 className="order-title">{selectedCrop ? "Buy Crop" : "Available Crops"}</h2>

     

      <div className="crops-list">
        {crops.map(crop => (
          <div key={crop._id} className="crop-order-card">
            <img src={`http://localhost:5001/uploads/${crop.image}`} alt={crop.name} />
            <h3>{crop.name}</h3>
            <p><strong>Price:</strong> ₹{crop.price}</p>
            <p><strong>Available:</strong> {crop.quantity} kg</p>

            <input
              type="number"
              className="quantity-input"
              placeholder="Quantity (kg)"
              value={quantity[crop._id] || ''}
              onChange={(e) => setQuantity({ ...quantity, [crop._id]: e.target.value })}
            />
 <input
        type="text"
        className="location-input"
        placeholder="Enter Delivery Location"
        value={deliveryLocation}
        onChange={(e) => setDeliveryLocation(e.target.value)}
      />
            <button className="order-button" onClick={() => handleOrder(crop)}>
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientOrderPage;
