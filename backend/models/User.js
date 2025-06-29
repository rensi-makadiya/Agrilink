const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
  role: String // 'admin', 'farmer', 'client'
});

userSchema.index({ email: 1, role: 1 }, { unique: true }); // 🔐 Unique email+role

module.exports = mongoose.model('User', userSchema);