// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Crop = require('../models/Crop');

// ✅ POST /orders/place
// ✅ POST /orders/place
router.post('/place', async (req, res) => {
  try {
    const { cropId, buyerEmail, quantity, deliveryLocation } = req.body;

    if (!cropId || !buyerEmail || !quantity || !deliveryLocation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const crop = await Crop.findById(cropId);
    if (!crop || crop.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity' });
    }

    const totalPrice = crop.price * quantity;
    crop.quantity -= quantity;
    await crop.save();

    const newOrder = new Order({
      cropId,
      buyerEmail,
      farmerEmail: crop.ownerEmail,
      quantity,
      deliveryLocation, // ✅ now correctly received
      totalPrice
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

router.get('/client/:email', async (req, res) => {
  try {
    const orders = await Order.find({ buyerEmail: req.params.email }).populate('cropId');
    const formatted = orders.map(order => ({
      _id: order._id,
      cropName: order.cropId?.name,
      cropPrice: order.cropId?.price,
      cropImage: order.cropId?.image,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      sellerEmail: order.farmerEmail,
      deliveryLocation:order.deliveryLocation,
      orderDate: order.orderDate,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching client orders:", err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


// ✅ Get all orders for a farmer
router.get('/farmer/:email', async (req, res) => {
  try {
    const orders = await Order.find({ farmerEmail: req.params.email }).populate('cropId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// ✅ Update order status
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: 'Order status updated', order: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});


router.get('/client/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const orders = await Order.find({ buyerEmail: email }); // ✅ FILTER by client email
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ❌ Delete an order if NOT shipped
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Shipped') {
      return res.status(400).json({ message: 'Cannot cancel shipped order' });
    }

    // Optional: restore quantity to crop
    const crop = await Crop.findById(order.cropId);
    if (crop) {
      crop.quantity += order.quantity;
      await crop.save();
    }

    await order.deleteOne();
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


