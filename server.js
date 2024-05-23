require("dotenv").config();
const path = require("path");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

const connectDB = require("./config/db");

const cors = require("cors");

app.use(express.static("public"));

app.use(express.json());

connectDB();

//CORS

app.use(
  cors({
    origin: "http://localhost:3000",
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
