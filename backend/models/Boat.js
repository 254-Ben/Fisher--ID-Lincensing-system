const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  owner: String,
  licensed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Boat', boatSchema);
