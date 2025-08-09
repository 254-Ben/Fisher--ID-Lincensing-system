import express from 'express';
import Boat from '../models/Boat.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's boats
router.get('/', authenticate, async (req, res) => {
  try {
    const boats = await Boat.find({ ownerId: req.user._id });
    res.json(boats);
  } catch (error) {
    console.error('Get boats error:', error);
    res.status(500).json({ message: 'Error fetching boats', error: error.message });
  }
});

// Create new boat
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, type, length, color, engineDetails } = req.body;
    
    // Set expiry date to 1 year from now
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const boat = new Boat({
      ownerId: req.user._id,
      name,
      type,
      length,
      color,
      engineDetails,
      expiryDate,
    });

    await boat.save();

    res.status(201).json({
      message: 'Boat registered successfully',
      boat,
    });
  } catch (error) {
    console.error('Boat creation error:', error);
    res.status(500).json({ message: 'Error registering boat', error: error.message });
  }
});

// Update boat
router.put('/:id', authenticate, async (req, res) => {
  try {
    const boat = await Boat.findOne({ _id: req.params.id, ownerId: req.user._id });
    
    if (!boat) {
      return res.status(404).json({ message: 'Boat not found' });
    }

    const updatedBoat = await Boat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: 'Boat updated successfully',
      boat: updatedBoat,
    });
  } catch (error) {
    console.error('Boat update error:', error);
    res.status(500).json({ message: 'Error updating boat', error: error.message });
  }
});

// Delete boat
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const boat = await Boat.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
    
    if (!boat) {
      return res.status(404).json({ message: 'Boat not found' });
    }

    res.json({ message: 'Boat deleted successfully' });
  } catch (error) {
    console.error('Boat deletion error:', error);
    res.status(500).json({ message: 'Error deleting boat', error: error.message });
  }
});

export default router;