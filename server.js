const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors"); //For enabling Cross-Origin Resource Sharing
const connectDB = require("./config/db");

const authRoute = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors()); // enables CORS in Express for all routes.
app.use(express.json()); //Converts the JSON string into a JavaScript object.

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
