const Fisher = require('../models/Fisher');

exports.createFisher = async (req, res) => {
  try {
    const fisher = new Fisher(req.body);
    await fisher.save();
    res.status(201).json(fisher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFishers = async (req, res) => {
  try {
    const fishers = await Fisher.find();
    res.json(fishers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFisher = async (req, res) => {
  try {
    const fisher = await Fisher.findById(req.params.id);
    res.json(fisher);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
};

exports.updateFisher = async (req, res) => {
  try {
    const fisher = await Fisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fisher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFisher = async (req, res) => {
  try {
    await Fisher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
