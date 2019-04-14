const knex = require('knex')
const dbConfig = require('../knexfile');

const environment = process.env.NODE_ENV || "development";
const configuration = dbConfig[environment];

module.exports = knex(configuration);
