const db = require("../index");

const get = (country_id, id) => {
  if (id) {
    return db("communities AS cm")
      .select(
        "cm.id as id",
        "cm.name AS community",
        "cm.city AS city",
        "cn.name AS country"
      )
      .join("countries AS cn", { "cn.id": "cm.country_id" })
      .where({ "cm.id": id })
      .first();
  }
  return db("communities AS cm")
    .select(
      "cm.id as id",
      "cm.name AS community",
      "cm.city AS city",
      "cn.name AS country"
    )
    .join("countries AS cn", { "cn.id": "cm.country_id" })
    .where({ "cm.country_id": country_id });
};

const create = community => {
  return db("communities")
    .insert(community, ['id'])
    .then(c => get(community.country_id, c[0].id));
};

const update = (country_id, id, changes) => {
  return db('communities')
    .update(changes, ['id'])
    .where({ id })
    .then(c => get(country_id, c[0].id));
};

const remove = (id) => {
  return db('communities')
    .where({ id })
    .del()
};

module.exports = {
  get,
  create,
  update,
  remove
};
