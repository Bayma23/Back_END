const express = require('express');
const { verificarToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
  res.json([]);
});

module.exports = router;
