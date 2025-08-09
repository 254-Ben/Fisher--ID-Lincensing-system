import express from 'express';
import DigitalId from '../models/DigitalId.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's digital ID
router.get('/', authenticate, async (req, res) => {
  try {
    const digitalId = await DigitalId.findOne({ fisherId: req.user._id });
    
    if (!digitalId) {
      return res.status(404).json({ message: 'Digital ID not found. Please generate one.' });
    }

    res.json(digitalId);
  } catch (error) {
    console.error('Get digital ID error:', error);
    res.status(500).json({ message: 'Error fetching digital ID', error: error.message });
  }
});

// Generate new digital ID
router.post('/generate', authenticate, async (req, res) => {
  try {
    // Check if user already has a digital ID
    const existingId = await DigitalId.findOne({ fisherId: req.user._id });
    
    if (existingId) {
      return res.status(400).json({ message: 'Digital ID already exists. Use renewal instead.' });
    }

    const digitalId = new DigitalId({
      fisherId: req.user._id,
    });

    await digitalId.save();

    res.status(201).json({
      message: 'Digital ID generated successfully',
      digitalId,
    });
  } catch (error) {
    console.error('Digital ID generation error:', error);
    res.status(500).json({ message: 'Error generating digital ID', error: error.message });
  }
});

// Renew digital ID
router.post('/:id/renew', authenticate, async (req, res) => {
  try {
    const digitalId = await DigitalId.findOne({ _id: req.params.id, fisherId: req.user._id });
    
    if (!digitalId) {
      return res.status(404).json({ message: 'Digital ID not found' });
    }

    // Update expiry date to 1 year from now
    const newExpiryDate = new Date();
    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);

    digitalId.expiryDate = newExpiryDate;
    digitalId.status = 'active';

    await digitalId.save();

    res.json({
      message: 'Digital ID renewed successfully',
      digitalId,
    });
  } catch (error) {
    console.error('Digital ID renewal error:', error);
    res.status(500).json({ message: 'Error renewing digital ID', error: error.message });
  }
});

export default router;