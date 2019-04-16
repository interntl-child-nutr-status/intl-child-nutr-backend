exports.seed = function(knex) {
  return knex.schema.raw(
    "TRUNCATE countries, communities, children, screenings, roles, users RESTART IDENTITY;"
  );
};
