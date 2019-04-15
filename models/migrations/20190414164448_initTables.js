exports.up = function(knex) {
  return knex.schema
    .createTable("countries", tbl => {
      tbl.increments();
      tbl.string("name", 255)
         .unique()
         .notNullable();
      tbl.string('code', 2)
         .unique()
         .notNullable();
    })
    .createTable("communities", tbl => {
      tbl.increments();
      tbl.string("name", 255);
      tbl.string("city", 255);
      tbl.integer("country_id")
         .references("id")
         .inTable("countries")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
    })
    .createTable("children", tbl => {
      tbl.increments();
      tbl.string("name", 255)
         .notNullable();
      tbl.date("dob")
         .notNullable();
      tbl.integer("age")
         .notNullable();
      tbl.integer("height");
      tbl.integer("weight");
      tbl.enu("sex", ["M", "F"], {
        useNative: true,
        enumName: "child_sex"
      });
    })
    .createTable('parents', tbl => {
      tbl.increments();
      tbl.string('name')
         .unique()
         .notNullable()
      tbl.string('address')
    })
    .createTable('parents_children', tbl => {
      tbl.increments();
      tbl.integer('parent_id')
         .references('id')
         .inTable('parents')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      tbl.integer('child_id')
         .references('id')
         .inTable('children')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
    })
    .createTable("screenings", tbl => {
      tbl.increments();
      tbl.date("screen_date");
      tbl.integer("child_id")
         .references("id")
         .inTable("children")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
      tbl.integer("community_id")
         .references('id')
         .inTable('communities')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
    })
    .createTable('roles', tbl => {
      tbl.increments()
      tbl.string('title', 255)
         .unique()
         .notNullable()
      tbl.string('description', 255)
    })
    .createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 255)
         .unique()
         .notNullable()
      tbl.string('password', 255)
         .notNullable()
      tbl.integer('role_id')
         .references('id')
         .inTable('roles')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      tbl.integer('country_id')
         .references('id')
         .inTable('countries')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('screenings')
    .dropTableIfExists('parents_children')
    .dropTableIfExists('parents')
    .dropTableIfExists('children')
    .dropTableIfExists('communities')
    .dropTableIfExists('countries')
};
