require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

const connectDB = require("./config/db");

// const router = require("./routes/files");
const cors = require("cors");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

// CORS
app.use(
  cors({
    origin: 'https://file-nexa-frontend.vercel.app/',
    credentials: true // Allow cookies and authorization headers
  })
);

//Template is ejs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");



//Routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});


