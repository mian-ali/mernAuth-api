const express = require('express');
const { signup, accountActivation } = require('../controllers/auth'); // import signup controller
const { userSignupValidator } = require('../validators/auth'); // import signup validator
const { runValidation } = require('../validators'); // import validator index

const router = express.Router();

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);

module.exports = router;
