const User = require('../models/user');

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  const { name, email, hashed_password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
      return res.status(400).json({
        error: 'Email is already taken',
      });
    }

    const newUser = new User({ name, email, hashed_password });
    await newUser.save();

    res.json({
      message: 'Signup success! Please signin.',
    });
  } catch (err) {
    console.log('SIGNUP ERROR', err);
    return res.status(400).json({
      error: err,
    });
  }
};
