// backend/models/Settings.js
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  heroEyebrow: { 
    type: String, 
    default: 'A HILLSIDE ESCAPE IN BANDARBAN' 
  },
  heroHeading: { 
    type: String, 
    default: 'Escape to\nthe Hills.' 
  },
  heroSubheading: { 
    type: String, 
    default: 'Stay above the clouds. Taste the heart of the hills. Experience pristine eco-luxury built in complete harmony with nature.' 
  },
  // ✨ Explicitly define the internal object rules for the slider array properties
  heroSlides: [
    {
      url: { type: String, required: true },
      alt: { type: String, default: 'Dim Pahar Retreat Landscape View' }
    }
  ]
}, { timestamps: true });

// Prevent re-compilation over Nodemons lifecycle updates
module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
