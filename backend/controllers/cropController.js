const Crop = require('../models/Crop');

// Add a new crop
exports.addCrop = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, quantity, price, description, ownerEmail, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const newCrop = new Crop({
      name,
      quantity,
      price,
      description,
      ownerEmail,
      location,
      image
    });

    await newCrop.save();
    res.status(201).json({ message: 'Crop added successfully' });
  } catch (err) {
    console.error("Error adding crop:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ _id: -1 });
    res.status(200).json(crops);
  } catch (err) {
    console.error("Error fetching crops:", err);
    res.status(500).json({ message: 'Failed to retrieve crops' });
  }
};

exports.getCropsByFarmer = async (req, res) => {
  try {
    const { email } = req.params;
const crops = await Crop.find({ ownerEmail: req.params.email });

    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

// PUT: Update a crop
exports.updateCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    const updateData = req.body;

    // Handle image update if provided
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCrop = await Crop.findByIdAndUpdate(cropId, updateData, { new: true });

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json({ message: "Crop updated", crop: updatedCrop });
  } catch (err) {
    console.error("Error updating crop:", err);
    res.status(500).json({ message: "Failed to update crop" });
  }
};

// Delete crop by ID
exports.deleteCrop = async (req, res) => {
  try {
    const cropId = req.params.id;

    const deletedCrop = await Crop.findByIdAndDelete(cropId);

    if (!deletedCrop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.status(200).json({ message: 'Crop deleted successfully' });
  } catch (err) {
    console.error("Error deleting crop:", err);
    res.status(500).json({ message: 'Failed to delete crop' });
  }
};

