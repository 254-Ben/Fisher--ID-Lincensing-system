const Permit = require('../models/Permit');

exports.issuePermit = async (req, res) => {
  try {
    const permit = new Permit(req.body);
    await permit.save();
    res.status(201).json(permit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPermits = async (req, res) => {
  try {
    const permits = await Permit.find();
    res.json(permits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
