import mongoose from 'mongoose';
import QRCode from 'qrcode';

const digitalIdSchema = new mongoose.Schema({
  fisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Generate ID number and QR code before saving
digitalIdSchema.pre('save', async function(next) {
  if (!this.idNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.idNumber = `FID-${year}-${String(count + 1).padStart(3, '0')}`;
  }

  if (!this.qrCode) {
    try {
      const qrData = {
        id: this._id,
        fisherId: this.fisherId,
        idNumber: this.idNumber,
        issueDate: this.issueDate,
        expiryDate: this.expiryDate,
      };
      this.qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    } catch (error) {
      return next(error);
    }
  }

  if (!this.expiryDate) {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    this.expiryDate = expiry;
  }

  next();
});

export default mongoose.model('DigitalId', digitalIdSchema);