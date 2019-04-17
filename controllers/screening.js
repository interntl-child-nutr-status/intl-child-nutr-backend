const router = require("express").Router();
const Screening = require("../models/db/screenings");

router
  .route("/:child_id")
  .get(async (req, res) => {
    const { child_id } = req.params;

    try {
      const screenings = await Screening.get(child_id);

      if (!screenings.length) {
        return res.status(404).json({
          message: "We don't currently have any screenings for that child"
        });
      }

      return res.status(200).json(screenings);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message:
          "Sorry! Looks like we encountered an error getting the screenings associated with that child"
      });
    }
  })
  .post(async (req, res) => {
    const { child_id } = req.params;
    const screening = req.body;

    if (!screening.screen_date || !screening.weight || !screening.height) {
      return res.status(400).json({
        message: "New screenings must contain a valid date, height, and weight"
      });
    }

    try {
      const newScreening = await Screening.create({ ...screening, child_id });
      return res.status(200).json(newScreening);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Sorry! We had an issue adding that screening to the database"
      });
    }
  });

router
  .route("/:child_id/:id")
  .put(async (req, res) => {
    const { child_id, id } = req.params;
    const changes = req.body;

    if (!changes) {
      return res.status(400).json({
        message: "Must include properties you'd like to see changed"
      });
    }

    try {
      const updatedScreening = await Screening.update(id, changes);
      return res.status(200).json(updatedScreening);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Sorry! We encountered an error updating that screening"
      });
    }
  })
  .delete(async (req, res) => {
    const { child_id, id } = req.params;
    try {
      const screenings = await Screening.get(child_id);
      const screening = screenings.filter(s => s.id == id)[0];

      if (!screening) {
        return res.status(404).json({
          message: "We can't seem to find a screening with that ID"
        });
      }

      await Screening.remove(id);

      return res.status(200).json(screening);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message:
          "Sorry! We encountered an error while removing that screening from our database"
      });
    }
  });

module.exports = router;
