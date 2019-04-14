// if something else isn't setting ENV, use development
const environment = process.env.NODE_ENV || "development";

// require environment's settings from knexfile
const configuration = require("../knexfile")[environment];

// connect to DB via knex using env's settings
const db = require("knex")(configuration);
