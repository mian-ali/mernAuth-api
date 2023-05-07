const mongoose = require('mongoose');

exports.connectDB = async () => {
  // async function
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1); // 1 = failure
  }
};

// exports.module = connectDB; // export the function
