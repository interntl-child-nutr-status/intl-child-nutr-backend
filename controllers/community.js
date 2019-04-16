const router = require("express").Router();
const Community = require("../models/db/communities");

router.route("/:country_id")
  .get(async (req, res) => {
    const { country_id } = req.params;
    try {
      const communities = await Community.get(country_id);
      if (communities.length < 1) {
        return res.status(404).json({
          message:
            "There don't appear to be any communities associated with that country"
        });
      }
      return res.status(200).json(communities);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message:
          "Sorry! Looks like we encountered an error getting that list of communities"
      });
    }
  })
  .post(async (req, res) => {
    const { country_id } = req.params;
    const { name, city } = req.body;
    if (!name || !city) {
      return res.status(400).json({
        message: "Name and City properties are required"
      })
    }
    try {
      const newCommunity = await Community.create({
        name,
        city,
        country_id
      })

      res.status(201).json(newCommunity);
    }
    catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Sorry! We ran into a problem creating that community"
      });
    }
  });

module.exports = router;
