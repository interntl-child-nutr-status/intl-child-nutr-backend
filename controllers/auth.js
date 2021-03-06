const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/db/users");
const Country = require("../models/db/countries");
const { generateToken } = require("../helpers/jwt");
const { checkToken, checkRole } = require("../middlewares/authorization");

router.post("/register", checkToken, checkRole("Admin"), async (req, res) => {
  const user = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  try {
    const newUser = await User.create(user);

    return res.status(201).json({
      message: `${newUser.username} has been successfully created.`
    });
  } catch (e) {
    console.error(
      `Error during ${req.method} @ ${req.path}\n\n`,
      `Error: ${e}\n\n`
    );
    return res
      .status(500)
      .json({ message: "We encountered an error while logging you in" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.get({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      if (user.role.toLowerCase() === "admin") {
        return res.status(200).json({
          message: `Welcome ${user.username}!`,
          is_admin: true,
          country: null,
          token
        });
      } else {
        const country = await Country.getActive(user.country_code).first();
        return res.status(200).json({
          message: `Welcome ${user.username}!`,
          is_admin: false,
          country: { id: country.id, name: country.country },
          token
        });
      }
    }

    return res.status(401).json({ message: "Invalid Credentials" });
  } catch (e) {
    console.error(
      `Error during ${req.method} @ ${req.path}\n\n`,
      `Error: ${e}\n\n`
    );
    return res
      .status(500)
      .json({ message: "We encountered an error while logging you in" });
  }
});

module.exports = router;
