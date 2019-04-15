require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

// Middleware:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Routes:
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up" });
});

app.listen(process.env.PORT, () => {
  console.log(`Dev server is up @ http://localhost:${process.env.PORT}/`);
});
