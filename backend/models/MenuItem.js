// backend/models/MenuItem.js
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['Signature', 'Traditional', 'Beverage', 'Dessert'], 
    required: true 
  },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
