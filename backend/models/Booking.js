// backend/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
  },
  guestName: { type: String, required: true, trim: true },
  guestEmail: { type: String, required: true, lowercase: true, trim: true },
  guestPhone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

// ✨ Next.js 16 & Nodemon Hot-Reload Friendly compilation pattern:
// It checks if the model already exists before trying to compile a new instance.
module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
