import React, { useEffect, useState } from 'react';
import { API } from '../api';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const res = await API.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      alert('Failed to load orders');
    }
  };

  return (
    <div className="admin-container">
         <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
             <tr key={order._id}>
  <td>{order.cropId?.name || 'N/A'}</td>
  <td>{order.buyerEmail || order.buyerId?.email}</td>
  <td>{order.farmerEmail}</td>

  <td>{order.quantity} kg</td>
  <td>₹{order.totalPrice}</td>
  <td>{order.deliveryLocation}</td>
  <td><b>{order.status}</b></td>
</tr>

            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
