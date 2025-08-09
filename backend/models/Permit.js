import mongoose from 'mongoose';

const permitSchema = new mongoose.Schema({
  fisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['seasonal', 'daily', 'commercial'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  species: [{
    type: String,
    required: true,
  }],
  area: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'pending', 'rejected'],
    default: 'pending',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  fee: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Auto-update status based on dates
permitSchema.methods.updateStatus = function() {
  const now = new Date();
  if (this.status === 'active' && now > this.endDate) {
    this.status = 'expired';
  }
};

export default mongoose.model('Permit', permitSchema);