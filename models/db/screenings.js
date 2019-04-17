const db = require("../index");

const get = id => {
  return db("screenings as s")
    .select("s.id", "s.screen_date", "s.weight", "s.height")
    .where({ "s.child_id": id })
    .orderBy("s.screen_date", "desc");
};

const create = screening => {
  return db("screenings")
    .insert(screening, ["child_id"])
    .then(c => get(c[0].child_id));
};

const update = (id, changes) => {
  return db("screenings")
    .update(changes, ["id", "screen_date", "height", "weight"])
    .where({ id })
    .then(s => s[0]);
};

const remove = id => {
  return db("screenings")
    .where({ id })
    .del();
};

module.exports = {
  get,
  create,
  update,
  remove
};
