const jwt = require("jsonwebtoken");

exports.generateToken = ({ id, username, role, country_code }) => {
  const payload = {
    subject: id,
    username,
    role,
    country_code
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
};
