const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  screen: {
    type: Number,
    required: true
  },
  showtime: {
    type: String,
    required: true
  },
  showDate: {
    type: Date,
    required: true
  },
  seats: [{
    type: String,
    required: true
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ userId: 1, bookingDate: -1 });
bookingSchema.index({ movieId: 1 });
bookingSchema.index({ showDate: 1, screen: 1, seats: 1 });

module.exports = mongoose.model('Booking', bookingSchema);