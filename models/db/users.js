const db = require("../index");

const get = filters => {
  if (filters) {
    return db
      .select(
        "u.id AS id",
        "u.username AS username",
        "u.password AS password",
        "r.title AS role",
        "c.code AS country_code"
      )
      .from("users AS u")
      .join("roles AS r", { "u.role_id": "r.id" })
      .leftOuterJoin("countries AS c", { "u.country_id": "c.id" })
      .where(filters)
      .first();
  }

  return db("users")
    .select(
      "u.id AS id",
      "u.username AS username",
      "u.password AS password",
      "r.title AS role",
      "c.code AS country_code"
    )
    .from("users AS u")
    .join("roles AS r", { "u.role_id": "r.id" })
    .leftOuterJoin("countries AS c", { "u.country_id": "c.id" });
};

const create = user => {
  return db("users")
    .insert(user)
    .then(_ => get({ "u.username": user.username }));
};

const update = (id, changes) => {
  return db("users")
    .where({ id })
    .update(changes)
    .then(_ => get({ "u.id": id }));
};

const remove = filter => {
  return db("users")
    .where(filter)
    .del();
};

module.exports = {
  get,
  create,
  update,
  remove
};
