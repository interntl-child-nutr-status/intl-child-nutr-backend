const db = require("../index");
const moment = require("moment");

const get = (community_id, id) => {
  if (id) {
    return db("children")
      .where({ id })
      .first();
  }
  return db("children").where({ community_id });
};

const create = child => {
  const newChild = {
    ...child,
    age: moment(Date.now()).diff(moment(child.dob, "MMDDYYYY"), "months"),
    dob: moment(child.dob, "MMDDYYYY")
  };
  return db("children")
    .insert(newChild, ["id"])
    .then(c => get(c.community_id, c[0].id));
};

const update = (id, changes) => {
  if (changes.dob) {
    changes.dob = moment(changes.dob, "MMDDYYYY");
    changes.age = moment(Date.now()).diff(moment(changes.dob, "MMDDYYYY"), "months");
  }
  return db("children")
    .update(changes, ["id"])
    .where({ id })
    .then(c => get(c.community_id, c[0].id));
};

const remove = id => {
  return db("children")
    .where({ id })
    .del();
};

module.exports = {
  get,
  create,
  update,
  remove
};
