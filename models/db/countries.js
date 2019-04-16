const db = require("../index");

const get = () => {
  return db("countries AS cn").select("cn.name AS Country", "cn.code AS Code");
};

const getActive = countryCode => {
  if (countryCode) {
    return db("countries AS cn")
      .select("cn.name AS Country")
      .count("cm.id AS Communities")
      .join("communities AS cm", { "cm.country_id": "cn.id" })
      .groupBy("cn.name")
      .orderBy("Communities")
      .where({ "cn.code": countryCode });
  }
  return db("countries AS cn")
    .select("cn.name AS Country")
    .count("cm.id AS Communities")
    .join("communities AS cm", { "cm.country_id": "cn.id" })
    .groupBy("cn.name")
    .orderBy("Communities");
};

module.exports = {
  get,
  getActive
};
