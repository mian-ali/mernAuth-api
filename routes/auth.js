const express = require('express');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.json({ message: 'You hit singup endpoint!' });
});

module.exports = router;
