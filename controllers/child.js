const router = require("express").Router();
const Child = require("../models/db/children");

router.route("/").post(async (req, res) => {
  const child = req.body;
  if (!child.name || !child.dob) {
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

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;

    try {
      const child = await Child.get(null, id);

      if (!child) {
        return res.status(404).json({
          message: "No child could be found at that ID"
        })
      }

      return res.status(200).json(child)
    }
    catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Sorry! We ran into a problem getting that record from the database"
      })
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    if (!changes) {
      return res.status(400).json({
        message: "Must include properties you'd like to see changed"
      })
    }
    
    try {
      const updatedChild = await Child.update(id, changes);

      return res.status(200).json(updatedChild)
    }
    catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Sorry! We ran into a problem getting that record from the database"
      })
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const child = await Child.get(null, id);

      if (!child) {
        return res.status(404).json({
          message: "We can't seem to find a child with that ID"
        });
      }

      await Child.remove(id);

      return res.status(200).json(child);
    } 
    catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Sorry! We encountered an error while removing that child from our database"
      });
    }
  })

module.exports = router;
