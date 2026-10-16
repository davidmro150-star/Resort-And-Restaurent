// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST pathway: Processes new checkout requests through anti-double-booking checks
router.post('/', bookingController.createBooking);

module.exports = router;
