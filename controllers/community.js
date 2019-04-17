const router = require("express").Router();
const Community = require("../models/db/communities");
const Child = require("../models/db/children");

router
  .route("/:country_id")
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
      });
    }
    try {
      const newCommunity = await Community.create({
        name,
        city,
        country_id
      });

      res.status(201).json(newCommunity);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Sorry! We ran into a problem creating that community"
      });
    }
  });

router
  .route("/:country_id/:id")
  .get(async (req, res) => {
    const { country_id, id } = req.params;
    try {
      const community = await Community.get(country_id, id);
      const children = await Child.get(id, null);

      if (!community) {
        return res.status(404).json({
          message: "There doesn't appear to be a community at that ID"
        });
      }

      return res.status(200).json({
        ...community,
        children
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message:
          "Sorry! We encoutered an error fetching that community from the database."
      });
    }
  })
  .put(async (req, res) => {
    const { country_id, id } = req.params;
    const changes = req.body;
    if (!changes.name.length || !changes.city.length) {
      return res.status(400).json({
        message: "You must include a change to either the name or a city"
      });
    }
    try {
      const update = await Community.update(country_id, id, changes);

      return res.status(200).json(update);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Sorry! We encountered an error updating that Community"
      });
    }
  })
  .delete(async (req, res) => {
    const { country_id, id } = req.params;
    try {
      const community = await Community.get(country_id, id);

      if (!community) {
        return res.status(404).json({
          message: "We can't seem to find a community at that ID"
        });
      }

      await Community.remove(id);

      return res.status(200).json(community);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Sorry! We encountered an error while deleting that Community"
      });
    }
  });

router.route("/:country_id/:id/children")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const children = await Child.get(id, null);

      if (!children.length) {
        return res.status(404).json({
          message: "We haven't screened any children in this community yet"
        });
      }

      return res.status(200).json(children);
    } 
    catch (e) {
      console.error(e);
      return res.status(500).json({
        message:
          "Sorry! We encountered an error getting the list of children for that community"
      });
    }
  });

module.exports = router;
