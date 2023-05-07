const express = require('express');
//import controller
const { signup } = require('../controllers/auth');
const router = express.Router();

router.get('/signup', signup);

module.exports = router;
