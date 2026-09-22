const express = require('express');
const router = express.Router();
const occasions = require('../data/occasions.json');

// GET /api/occasions - Get all occasions
router.get('/', (req, res) => {
  res.json({
    total: occasions.length,
    occasions
  });
});

// GET /api/occasions/:id - Get single occasion
router.get('/:id', (req, res) => {
  const occasion = occasions.find(o => o.id === Number(req.params.id));
  if (!occasion) {
    return res.status(404).json({ error: 'Occasion not found' });
  }
  res.json(occasion);
});

module.exports = router;
