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

const create = (community) => {
  return db('communities')
    .insert(community)
    .then(_ => get(community.country_id));
}

const update = () => {}

const remove = () => {}

module.exports = {
  get,
  create,
  update,
  remove
}