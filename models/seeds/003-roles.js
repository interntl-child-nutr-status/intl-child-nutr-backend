exports.seed = function(knex) {
  return knex("roles").insert([
    { 
      title: "Admin", 
      description: "Access to all countries. Can create new admins and country specific users." 
    },
    { 
      title: "User", 
      description: "Access to a specific country only. Can create new communities, screenings, children, and parents" 
    },
  ]);
};
