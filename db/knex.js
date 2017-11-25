const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('../node_modules/knex')(knexConfig);

module.exports = knex;
