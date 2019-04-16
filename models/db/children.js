const db = require('../index');

const get = (community_id, id) => {
  if (id) {
    return db('children').where({ id }).first();
  }
  return db('children')
    .where({ community_id });
}

module.exports = {
  get,
}