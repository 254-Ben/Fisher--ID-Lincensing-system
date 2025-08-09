import express from 'express';
import User from '../models/User.js';
import Boat from '../models/Boat.js';
import Permit from '../models/Permit.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize(['admin']));

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'fisher' }).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get all boats
router.get('/boats', async (req, res) => {
  try {
    const boats = await Boat.find().populate('ownerId', 'firstName lastName email');
    res.json(boats);
  } catch (error) {
    console.error('Get boats error:', error);
    res.status(500).json({ message: 'Error fetching boats', error: error.message });
  }
});

// Get all permits
router.get('/permits', async (req, res) => {
  try {
    const permits = await Permit.find().populate('fisherId', 'firstName lastName email');
    res.json(permits);
  } catch (error) {
    console.error('Get permits error:', error);
    res.status(500).json({ message: 'Error fetching permits', error: error.message });
  }
});

// Approve permit
router.put('/permits/:id/approve', async (req, res) => {
  try {
    const permit = await Permit.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'active',
        paymentStatus: 'paid'
      },
      { new: true }
    );

    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    res.json({
      message: 'Permit approved successfully',
      permit,
    });
  } catch (error) {
    console.error('Permit approval error:', error);
    res.status(500).json({ message: 'Error approving permit', error: error.message });
  }
});

// Reject permit
router.put('/permits/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;
    
    const permit = await Permit.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        rejectionReason: reason
      },
      { new: true }
    );

    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    res.json({
      message: 'Permit rejected successfully',
      permit,
    });
  } catch (error) {
    console.error('Permit rejection error:', error);
    res.status(500).json({ message: 'Error rejecting permit', error: error.message });
  }
});

// Verify user
router.put('/users/:id/verify', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User verified successfully',
      user,
    });
  } catch (error) {
    console.error('User verification error:', error);
    res.status(500).json({ message: 'Error verifying user', error: error.message });
  }
});

export default router;