// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://agro:123@cluster0.vhie5lg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
