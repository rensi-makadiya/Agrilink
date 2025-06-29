// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
  buyerEmail: { type: String, required: true }, // ✅ Required
  farmerEmail: String,
  quantity: Number,
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  deliveryLocation: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
