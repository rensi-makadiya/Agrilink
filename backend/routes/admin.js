// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Crop = require('../models/Crop');
const Order = require('../models/Order');

router.get('/admin/farmers', async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' });
    res.json(farmers);
  } catch (err) {
    console.error('Failed to load farmers:', err);
    res.status(500).json({ error: 'Failed to load farmers' });
  }
});

// DELETE farmer by ID
router.delete('/admin/farmers/:id', async (req, res) => {
  try {
    const farmer = await User.findByIdAndDelete(req.params.id);
    if (!farmer) return res.status(404).json({ error: 'Farmer not found' });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete farmer' });
  }
});

// ✅ Get all clients
router.get('/admin/clients', async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' });
    res.json(clients);
  } catch (err) {
    console.error('Failed to load clients:', err);
    res.status(500).json({ error: 'Failed to load clients' });
  }
});

// ✅ Delete a client
router.delete('/admin/clients/:id', async (req, res) => {
  try {
    const client = await User.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});


// Get all crops
router.get('/crops', async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

// Get all orders
// ✅ Get all orders
router.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('cropId'); // Only populate crop if it's referenced correctly

    res.json(orders);
  } catch (err) {
    console.error('Failed to load orders:', err);
    res.status(500).json({ error: 'Failed to load orders' });
  }
});


module.exports = router;
