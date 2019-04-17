const router = require("express").Router();
const Child = require("../models/db/children");

router.route("/").post(async (req, res) => {
  const child = req.body;
  if (!child.name || !child.dateOfBirth) {
    return res.status(400).json({
      message: "All new child records must have a name & date of birth to be added to the database"
    });
  }

  try {
    const newChild = await Child.create(child);

    return res.status(201).json(newChild);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Oops! Looks like we encountered an error adding that child to our database"
    });
  }
});

router.route("/:community_id").get(async (req, res) => {
  const { community_id } = req.params;
  try {
    const children = await Child.get(community_id, null);

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
      message: "Sorry! We encountered an error getting the list of children for that community"
    });
  }
});

module.exports = router;
