const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// Quiz recommendation logic
const vibeMap = {
  cozy: ['cozy'],
  chic: ['beauty'],
  glow: ['beauty', 'floral'],
  dreamer: ['cozy', 'chocolates']
};

// GET /api/quiz/recommend - Get quiz-based recommendation
router.get('/recommend', (req, res) => {
  const { recipient, occasion, vibe, budget } = req.query;

  let result = [...products];

  // Filter by vibe/aesthetic
  if (vibe && vibeMap[vibe]) {
    const categories = vibeMap[vibe];
    result = result.filter(p => categories.includes(p.category));
  }

  // Filter by budget
  if (budget) {
    const maxBudget = Number(budget);
    result = result.filter(p => p.price <= maxBudget);
  }

  // Sort by rating (best matches first)
  result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

  // Get top recommendation
  const topMatch = result[0] || products[0];
  const alternatives = result.slice(1, 4);

  const matchScore = Math.min(98, 85 + Math.floor(Math.random() * 14));

  res.json({
    recommendation: {
      ...topMatch,
      matchScore,
      whyShellLove: generateReason(topMatch, vibe, recipient),
      inclusions: generateInclusions(topMatch)
    },
    alternatives,
    quizAnswers: { recipient, occasion, vibe, budget }
  });
});

function generateReason(product, vibe, recipient) {
  const reasons = {
    cozy: `Features a hand-poured lavender & bergamot candle for cozy comfort, paired with artisanal treats and a keepsake charm.`,
    chic: `Curated with rose gold accents and French raspberry macarons, wrapped in champagne silk tissue for an elegant unboxing.`,
    glow: `Includes botanical bath soaks and rose mist for a spa-like self-care experience she'll cherish.`,
    dreamer: `A dreamy collection of journaling essentials, mood tea, and sweet cocoa for quiet creative evenings.`
  };
  return reasons[vibe] || reasons.cozy;
}

function generateInclusions(product) {
  const allInclusions = [
    { emoji: '🕯️', label: 'Scented Candle' },
    { emoji: '🍬', label: '6 French Macarons' },
    { emoji: '✨', label: 'Rose Gold Charm' },
    { emoji: '💌', label: 'Wax-Sealed Note', highlight: true }
  ];
  return allInclusions;
}

module.exports = router;
