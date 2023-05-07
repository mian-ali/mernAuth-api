const express = require('express');

// import routes
const authRoutes = require('./routes/auth');
const app = express();

// middleware
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello Server');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
