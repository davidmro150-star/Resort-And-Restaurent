// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Room = require('./models/Room');
const Settings = require('./models/Settings'); // 🔌 Import Settings Model
const bookingController = require('./controllers/bookingController');
require('dotenv').config();

const app = express();

connectDB();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// --- Core API Bindings ---

// 🏔️ Dynamic Settings API Endpoints
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    // If no settings exist yet, create a default record
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const updatedSettings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true // Creates it if it doesn't exist
    });
    res.json(updatedSettings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🏠 Rooms API Endpoints
app.get('/api/rooms', async (req, res) => {
  try {
    const list = await Room.find({});
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add this inside your backend/server.js right below your room endpoints:

const MenuItem = require('./models/MenuItem'); // 🔌 Import Menu Model at the top if needed

// 🍽️ Restaurant Menu API Endpoint
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/rooms/:slug', async (req, res) => {
  try {
    const item = await Room.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: 'Cottage profile not found.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', bookingController.createBooking);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Dim Pahar API operational on http://localhost:${PORT}`));
