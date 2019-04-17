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
    name: child.name,
    contact: child.contact,
    guardian: child.guardian,
    community_id: parseInt(child.community),
    country_id: parseInt(child.country),
    age: moment(Date.now()).diff(
      moment(child.dateOfBirth, "MMDDYYYY"),
      "months"
    ),
    dob: moment(child.dateOfBirth, "MMDDYYYY")
  };
  return db("children")
    .insert(newChild, ["id"])
    .then(c => get(c.community_id, c[0].id));
};

const update = (id, changes) => {
  return db("children")
    .update(changes, ["id"])
    .where({ id })
    .then(c => get(c.community_id, c[0].id));
};

module.exports = {
  get,
}