const express = require('express');
const router = express.Router();
const controller = require('../controllers/fisherController');

router.post('/', controller.createFisher);
router.get('/', controller.getFishers);
router.get('/:id', controller.getFisher);
router.put('/:id', controller.updateFisher);
router.delete('/:id', controller.deleteFisher);

module.exports = router;
