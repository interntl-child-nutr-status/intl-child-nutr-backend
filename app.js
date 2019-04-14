require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware:
app.use(cors())
app.use(express.json());

// Routes:

switch (process.env.NODE_ENV) {
  case 'production':
    app.listen(process.env.PORT)
  case 'development':
    app.listen(process.env.PORT, () => {
      console.log(`Server is up @ http://localhost:${process.env.PORT}/`)
    })
}
