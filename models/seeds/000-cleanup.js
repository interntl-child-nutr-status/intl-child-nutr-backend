exports.seed = function(knex) {
  return knex.schema.raw(
    "TRUNCATE countries, communities, children, parents, parents_children, screenings, roles, users RESTART IDENTITY;"
  );
};
