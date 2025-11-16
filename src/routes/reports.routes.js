const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.get('/', reportsController.list);

module.exports = router;
