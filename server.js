const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // import auth routes
const { connectDB } = require('./config/DATABASE'); // import database connection
const app = express();

// application based middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
dotenv.config();

//connect to DATABASE Function Call
connectDB();

app.use(cors()); // allows all origins

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from nodejs server!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running on port ${port} -mode- ${process.env.NODE_ENV}`
  );
});
