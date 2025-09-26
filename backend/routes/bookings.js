const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

// Create new booking
router.post('/', async (req, res) => {
  try {
    // Verify movie exists
    const movie = await Movie.findById(req.body.movieId);
    if (!movie || !movie.isActive) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check seat availability (simplified - in production, you'd want more robust seat locking)
    const existingBookings = await Booking.find({
      movieId: req.body.movieId,
      screen: req.body.screen,
      showtime: req.body.showtime,
      showDate: req.body.showDate || new Date(),
      status: 'confirmed',
      seats: { $in: req.body.seats }
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: 'Some seats are already booked' });
    }

    const booking = new Booking({
      ...req.body,
      userId: req.user.uid,
      userEmail: req.user.email,
      showDate: req.body.showDate || new Date()
    });

    await booking.save();
    await booking.populate('movieId');
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.uid })
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.uid
    }).populate('movieId');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel booking
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { 
        _id: req.params.id, 
        userId: req.user.uid,
        status: 'confirmed'
      },
      { status: 'cancelled' },
      { new: true }
    ).populate('movieId');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found or already cancelled' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get seat availability for a specific show
router.get('/availability/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { screen, showtime, date } = req.query;

    if (!screen || !showtime) {
      return res.status(400).json({ error: 'Screen and showtime are required' });
    }

    const showDate = date ? new Date(date) : new Date();
    
    const bookedSeats = await Booking.find({
      movieId,
      screen: parseInt(screen),
      showtime,
      showDate,
      status: 'confirmed'
    }).distinct('seats');

    res.json({ bookedSeats: bookedSeats.flat() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;