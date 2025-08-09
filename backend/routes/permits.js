import express from 'express';
import Permit from '../models/Permit.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's permits
router.get('/', authenticate, async (req, res) => {
  try {
    const permits = await Permit.find({ fisherId: req.user._id });
    res.json(permits);
  } catch (error) {
    console.error('Get permits error:', error);
    res.status(500).json({ message: 'Error fetching permits', error: error.message });
  }
});

// Create new permit application
router.post('/', authenticate, async (req, res) => {
  try {
    const { type, startDate, endDate, species, area, fee } = req.body;

    const permit = new Permit({
      fisherId: req.user._id,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      species,
      area,
      fee,
    });

    await permit.save();

    res.status(201).json({
      message: 'Permit application submitted successfully',
      permit,
    });
  } catch (error) {
    console.error('Permit creation error:', error);
    res.status(500).json({ message: 'Error creating permit application', error: error.message });
  }
});

// Update permit
router.put('/:id', authenticate, async (req, res) => {
  try {
    const permit = await Permit.findOne({ _id: req.params.id, fisherId: req.user._id });
    
    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    if (permit.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot modify approved or expired permit' });
    }

    const updatedPermit = await Permit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: 'Permit updated successfully',
      permit: updatedPermit,
    });
  } catch (error) {
    console.error('Permit update error:', error);
    res.status(500).json({ message: 'Error updating permit', error: error.message });
  }
});

// Delete permit
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const permit = await Permit.findOne({ _id: req.params.id, fisherId: req.user._id });
    
    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    if (permit.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot delete approved or active permit' });
    }

    await Permit.findByIdAndDelete(req.params.id);

    res.json({ message: 'Permit application cancelled successfully' });
  } catch (error) {
    console.error('Permit deletion error:', error);
    res.status(500).json({ message: 'Error deleting permit', error: error.message });
  }
});

export default router;