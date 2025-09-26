const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get all movies with optional filtering
router.get('/', async (req, res) => {
  try {
    const { genre, search, limit = 50 } = req.query;
    let query = { isActive: true };

    if (genre && genre !== 'all') {
      query.genres = { $in: [genre] };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const movies = await Movie.find(query)
      .limit(parseInt(limit))
      .sort({ releaseYear: -1, createdAt: -1 });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.isActive) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review to movie (requires authentication)
router.post('/:id/reviews', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.isActive) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const review = {
      ...req.body,
      authorId: req.user?.uid || 'anonymous',
      author: req.user?.name || req.user?.email || 'Anonymous User'
    };

    movie.reviews.push(review);
    await movie.save();

    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all genres
router.get('/meta/genres', async (req, res) => {
  try {
    const genres = await Movie.distinct('genres', { isActive: true });
    res.json(genres.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new movie (admin only - would need admin middleware)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;