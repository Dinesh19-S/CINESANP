const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const showtimeSchema = new mongoose.Schema({
  screen: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  posterAiHint: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  genres: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  reviews: [reviewSchema],
  showtimes: [showtimeSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ genres: 1 });
movieSchema.index({ releaseYear: -1 });

module.exports = mongoose.model('Movie', movieSchema);