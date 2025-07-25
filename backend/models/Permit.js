const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
  fisherId: String,
  type: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['active', 'expired'], default: 'active' }
});

module.exports = mongoose.model('Permit', permitSchema);
