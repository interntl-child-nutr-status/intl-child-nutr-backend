exports.up = function(knex) {
  return knex.schema
    .createTable("countries", tbl => {
      tbl.increments();
      tbl.text("name")
         .unique()
         .notNullable();
      tbl.text("code")
         .unique()
         .notNullable();
    })
    .createTable("communities", tbl => {
      tbl.increments();
      tbl.text("name");
      tbl.text("city");
      tbl.integer("country_id")
         .references("id")
         .inTable("countries")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
    })
    .createTable("children", tbl => {
      tbl.increments();
      tbl.text("name").notNullable();
      tbl.date("dob").notNullable();
      tbl.integer("age").notNullable();
      tbl.text("sex", 1);
      tbl.text("guardian");
      tbl.text("contact");
      tbl.integer("country_id")
         .references("id")
         .inTable("countries")
         .onDelete("CASCADE")
         .onUpdate("CASCADE")
      tbl.integer("community_id")
         .references("id")
         .inTable("communities")
         .onDelete("CASCADE")
         .onUpdate("CASCADE")
    })
    .createTable("screenings", tbl => {
      tbl.increments();
      tbl.date("screen_date");
      tbl.integer("height");
      tbl.integer("weight");
      tbl.integer("child_id")
         .references("id")
         .inTable("children")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
    })
    .createTable("roles", tbl => {
      tbl.increments();
      tbl.text("title", 255)
         .unique()
         .notNullable();
      tbl.text("description", 255);
    })
    .createTable("users", tbl => {
      tbl.increments();
      tbl.text("username", 255)
         .unique()
         .notNullable();
      tbl.text("password", 255).notNullable();
      tbl.integer("role_id")
         .references("id")
         .inTable("roles")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
      tbl.integer("country_id")
         .references("id")
         .inTable("countries")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
   .dropTableIfExists("users")
   .dropTableIfExists("roles")
   .dropTableIfExists("screenings")
   .dropTableIfExists("children")
   .dropTableIfExists("communities")
   .dropTableIfExists("countries")
};
