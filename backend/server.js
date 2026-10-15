// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Room = require('./models/Room');
const bookingController = require('./controllers/bookingController');
require('dotenv').config();

const app = express();

connectDB();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// API Route Bindings
app.get('/api/rooms', async (req, res) => {
  try {
    const list = await Room.find({});
    res.json(list);
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
