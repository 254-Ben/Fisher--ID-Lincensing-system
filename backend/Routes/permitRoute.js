const express = require('express');
const router = express.Router();
const permitController = require('../controllers/permitController');

router.post('/', permitController.issuePermit);
router.get('/', permitController.getPermits);

module.exports = router;
