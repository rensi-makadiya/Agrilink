import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import './ClientStatus.css'; // ✅ CSS File

function ClientMyOrders() {
  const [orders, setOrders] = useState([]);
  const email = localStorage.getItem('clientEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/client/${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch client orders', err);
      }
    };

    if (email) fetchOrders();
  }, [email]);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    } catch (err) {
      console.error('Failed to delete order', err);
      alert('Failed to cancel the order. Please try again.');
    }
  };

  return (
    <div className="orders-container">
      <button className="back-button" onClick={() => navigate('/client')}>⬅ Back</button>
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>{order.cropName}</h3>
            <img
              src={`http://localhost:5001/uploads/${order.cropImage}`}
              width="200"
              alt={order.cropName}
              className="order-image"
            />
            <p><strong>Seller:</strong> {order.sellerEmail}</p>
            <p><strong>Quantity:</strong> {order.quantity} kg</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Status:</strong> <b>{order.status}</b></p>

            {order.status !== 'Shipped' && (
              <button className="cancel-button" onClick={() => handleDelete(order._id)}>
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ClientMyOrders;
