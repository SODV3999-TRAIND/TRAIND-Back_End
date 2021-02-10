const express = require("express");
const event = require("../models/event");

const router = express.Router();

router.post("/book", (req, res) => {
  // TODO: Add next()
  const { attendee, organizer, startDate, endDate, location } = req.body;
  event.newEvent(
    attendee,
    startDate,
    endDate,
    organizer,
    location,
    (err, result) => {
      if (err) {
        // TODO: Add more robust error handling.
        console.log("Error creating event");
      } else {
        res.send(`Event ID: ${result.insertedId}`);
      }
    }
  );
});

module.exports = router;
