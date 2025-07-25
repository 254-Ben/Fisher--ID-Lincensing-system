const mongoose = require('mongoose');

const fisherSchema = new mongoose.Schema({
  name: String,
  nationalId: String,
  boatName: String,
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fisher', fisherSchema);
