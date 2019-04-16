const db = require("../index");

const get = () => {
  return db("countries AS cn").select(
    "cn.id AS id",
    "cn.name AS country",
    "cn.code AS code"
  );
};

const getActive = countryCode => {
  if (countryCode) {
    return db("countries AS cn")
      .select("cn.id as id", "cn.name AS Country")
      .count("cm.id AS Communities")
      .join("communities AS cm", { "cm.country_id": "cn.id" })
      .groupBy("cn.id")
      .orderBy("communities", "desc")
      .where({ "cn.code": countryCode });
  }
  return db("countries AS cn")
    .select("cn.id as id", "cn.name AS Country")
    .count("cm.id AS Communities")
    .join("communities AS cm", { "cm.country_id": "cn.id" })
    .groupBy("cn.id")
    .orderBy("communities", "desc");
};

module.exports = {
  get,
  getActive
};
