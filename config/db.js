require("dotenv").config();

const mongoose = require("mongoose");

function connectDB() {
    //Database connection
    mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then((response) => {
        console.log("Connected to database")
    })
    .catch((error) => {
        console.log(error);
    });
    const connection = mongoose.connection;

}

module.exports = connectDB;