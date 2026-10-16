// backend/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET pathway: Fetches all active cottages for the showcase grids
router.get('/', async (req, res) => {
  try {
    const list = await Room.find({});
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET pathway: Fetches a single cottage using its unique URL slug config
router.get('/:slug', async (req, res) => {
  try {
    const item = await Room.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: 'Cottage profile not found.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
