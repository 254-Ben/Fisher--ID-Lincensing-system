import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['fishing', 'recreational', 'commercial'],
  },
  length: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  engineDetails: {
    type: String,
    required: true,
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'pending'],
    default: 'pending',
  },
  documents: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Auto-generate registration number if not provided
boatSchema.pre('save', async function(next) {
  if (!this.registrationNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.registrationNumber = `FBT-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model('Boat', boatSchema);