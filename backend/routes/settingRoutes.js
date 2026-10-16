// backend/routes/settingRoutes.js
const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET pathway: Fetches active hero layout parameters for the frontend slider
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({}); // Generates fallback defaults if empty
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT pathway: Receives text and image edits from your CMS Admin panel
router.put('/', async (req, res) => {
  try {
    const updatedSettings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true
    });
    res.json(updatedSettings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
