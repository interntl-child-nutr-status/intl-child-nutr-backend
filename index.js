require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// App definition
const app = express();

// Middleware:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Routes:
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up" });
});

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`API is up @ http://${host}:${port}`);
});
