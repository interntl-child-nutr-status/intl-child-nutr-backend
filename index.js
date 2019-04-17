require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { checkToken } =  require('./middlewares/authorization');

const authRoutes = require('./controllers/auth');
const countryRoutes = require('./controllers/country');
const communityRoutes = require('./controllers/community');
const childRoutes = require('./controllers/child');

const app = express();

// Middleware:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Routes:
app.use('/api/auth', authRoutes);
app.use('/api/countries', checkToken, countryRoutes);
app.use('/api/communities', checkToken, communityRoutes);
app.use('/api/children', checkToken, childRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up" });
});

if (require.main == module) {
  app.listen(process.env.PORT, () => {
    console.log(`Dev server is up @ http://localhost:${process.env.PORT}/`);
  });
} else {
  module.exports = app;
}
