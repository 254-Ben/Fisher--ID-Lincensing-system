const Boat = require('../models/Boat');

exports.createBoat = async (req, res) => {
  try {
    const boat = new Boat(req.body);
    await boat.save();
    res.status(201).json(boat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBoats = async (req, res) => {
  try {
    const boats = await Boat.find();
    res.json(boats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBoat = async (req, res) => {
  try {
    const updated = await Boat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBoat = async (req, res) => {
  try {
    await Boat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Boat deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
