const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');
const upload = require('../middleware/upload');

router.post('/add-crop', upload.single('image'), cropController.addCrop);
router.get('/all', cropController.getAllCrops); // 👈 this line must be here
router.get('/by-farmer/:email', cropController.getCropsByFarmer); 
router.put('/update/:id', upload.single('image'), cropController.updateCrop);
// DELETE: Delete a crop by ID
router.delete('/delete/:id', cropController.deleteCrop);

module.exports = router;
