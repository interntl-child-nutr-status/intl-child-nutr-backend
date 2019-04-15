const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    { 
      username: 'nickcannariato', 
      password: bcrypt.hashSync('password', 10), 
      role_id: 1 
    },
    { 
      username: 'andrewsafran', 
      password: bcrypt.hashSync('password', 10), 
      role_id: 1 
    },
    {
      username: 'johndoe',
      password: bcrypt.hashSync('password', 10),
      role_id: 1,
    }
  ]);
};
