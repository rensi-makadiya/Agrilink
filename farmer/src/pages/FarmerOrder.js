import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import './FarmerOrders.css';

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const farmerEmail = localStorage.getItem('farmerEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/farmer/${farmerEmail}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    if (farmerEmail) {
      fetchOrders();
    }
  }, [farmerEmail]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/status/${orderId}`, { status: newStatus });
      alert("✅ Status updated!");
      const res = await API.get(`/orders/farmer/${farmerEmail}`);
      setOrders(res.data);
    } catch (err) {
      alert("❌ Failed to update status");
    }
  };

  return (
    <div className="orders-container">
      <button onClick={() => navigate(-1)} className="back-button-top">← Back</button>
      <h2 className="orders-title">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>{order.cropId?.name}</h3>
            <p><strong>👤 Buyer:</strong> {order.buyerEmail}</p>
            <p><strong>📦 Quantity:</strong> {order.quantity} kg</p>
            <p><strong>💰 Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>📍 Location:</strong> {order.deliveryLocation}</p>
            <p><strong>📌 Status:</strong> {order.status}</p>

            <select
              onChange={(e) => updateStatus(order._id, e.target.value)}
              value={order.status}
              className="status-select"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Shipped">Shipped</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default FarmerOrders;
