// backend/models/Settings.js
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  heroEyebrow: { type: String, default: 'A HILLSIDE ESCAPE IN BANDARBAN' },
  heroHeading: { type: String, default: 'Escape to the Hills.' },
  heroSubheading: { type: String, default: 'Stay above the clouds. Taste the heart of the hills.' },
  // Array of image structures containing the source URL and custom accessibility alt text
  heroSlides: [
    {
      url: { type: String, required: true },
      alt: { type: String, default: 'Dim Pahar Retreat Landscape view' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
