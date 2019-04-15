exports.seed = function(knex) {
  return knex("communities").insert([
    { name: "Albany Park", city: "Chicago", country_id: 230 },
    { name: "Edgewater", city: "Chicago", country_id: 230 },
    { name: "Belmont Central", city: "Chicago", country_id: 230 },
    { name: "Beverly View", city: "Chicago", country_id: 230 },
    { name: "Austin", city: "Chicago", country_id: 230 }
  ]);
};
