const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET /api/products - Get all products with optional filtering & sorting
router.get('/', (req, res) => {
  let result = [...products];
  const { category, sort, minPrice, maxPrice, search } = req.query;

  // Filter by category
  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  // Filter by price range
  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // Search by name or description
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (sort) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'best':
    default:
      result.sort((a, b) => b.reviews - a.reviews);
      break;
  }

  res.json({
    total: result.length,
    products: result
  });
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
