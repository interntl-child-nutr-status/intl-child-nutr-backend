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
      tbl.text("name").notNullable();
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
      tbl.text("sex", 1).notNullable();
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
      tbl.decimal("height");
      tbl.decimal("weight");
      tbl.integer("child_id")
         .references("id")
         .inTable("children")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
    })
    .createTable("roles", tbl => {
      tbl.increments();
      tbl.text("title")
         .unique()
         .notNullable();
      tbl.text("description");
    })
    .createTable("users", tbl => {
      tbl.increments();
      tbl.text("username")
         .unique()
         .notNullable();
      tbl.text("password").notNullable();
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
