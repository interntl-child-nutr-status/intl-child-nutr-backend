const db = require('../index');

const get = (country_id) => {
  return db('communities').where({ country_id });
}

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