require("dotenv").config();

// const mongoose = require("mongoose");

// function connectDB() {
//     mongoose.connect(process.env.MONGODB_CONNECTION_URL)
//     .then((response) => {
//         console.log("Connected to database")
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//     const connection = mongoose.connection;

// }


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if no servers are available
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

module.exports = connectDB;

