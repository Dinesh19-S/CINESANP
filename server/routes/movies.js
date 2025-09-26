const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new movie (admin only)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add review to movie
router.post('/:id/reviews', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    movie.reviews.push(req.body);
    await movie.save();
    
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all genres
router.get('/genres/all', async (req, res) => {
  try {
    const movies = await Movie.find();
    const genres = new Set();
    
    movies.forEach(movie => {
      movie.genres.forEach(genre => genres.add(genre));
    });
    
    res.json(Array.from(genres).sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;