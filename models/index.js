const knex = require("knex");
const dbConfig = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const configuration = dbConfig[environment];
const db = knex(configuration)

module.exports = db

