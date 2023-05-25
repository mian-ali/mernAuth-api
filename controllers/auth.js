const User = require('../models/user');
const jwt = require('jsonwebtoken');
// sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// SIMPLE USER SIGNUP CONTROLLER SAVE DATA INTO DB()
// exports.signup = async (req, res) => {
//   const { name, email, hashed_password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email: email }).exec();
//     if (existingUser) {
//       return res.status(400).json({
//         error: 'Email is already taken',
//       });
//     }

//     const newUser = new User({ name, email, hashed_password });
//     await newUser.save();

//     res.json({
//       message: 'Signup success! Please signin.',
//     });
//   } catch (err) {
//     console.log('SIGNUP ERROR', err);
//     return res.status(400).json({
//       error: err,
//     });
//   }
// };

// Email USER SIGNUP CONTROLLER

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: 'Email is taken',
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Account Activation Link',
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };

    await sgMail.send(emailData);

    return res.json({
      message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Expired link. Signup again',
          });
        }

        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
            return res.status(401).json({
              error: 'Error saving user in database. Try signup again',
            });
          }
          return res.json({
            message: 'Signup success. Please signin.',
          });
        });
      }
    );
  } else {
    return res.json({
      message: 'Something went wrong. Try again.',
    });
  }
};
