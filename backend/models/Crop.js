const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  description: String,
  location: String,
  ownerEmail: String,
  image: String
});

module.exports = mongoose.model('Crop', cropSchema);
