// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.createBooking = async (req, res) => {
  try {
    const { roomId, guestName, guestEmail, guestPhone, checkIn, checkOut } = req.body;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start >= end) {
      return res.status(400).json({ error: 'Check-out date must succeed check-in date.' });
    }

    // Mathematical overlap validation pipeline
    const structuralConflict = await Booking.findOne({
      room: roomId,
      status: 'Confirmed',
      $or: [
        { checkIn: { $lt: end, $gte: start } },
        { checkOut: { $gt: start, $lte: end } },
        { checkIn: { $lte: start }, checkOut: { $gte: end } }
      ]
    });

    if (structuralConflict) {
      return res.status(400).json({ error: 'The requested cottage is already reserved during these dates.' });
    }

    const roomInstance = await Room.findById(roomId);
    if (!roomInstance) {
      return res.status(404).json({ error: 'Target cottage configuration profile not found.' });
    }

    const nightsCalculated = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const pricingSummary = nightsCalculated * roomInstance.pricePerNight;

    const preciseBooking = new Booking({
      room: roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn: start,
      checkOut: end,
      totalPrice: pricingSummary
    });

    await preciseBooking.save();
    res.status(201).json({ success: true, data: preciseBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
