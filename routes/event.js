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

router.get("/trainer/:trainerId", (req, res) => {
  const trainerId = req.params.trainerId;
  event.getTrainerEvents(trainerId, (err, results) => {
    if (err) {
      // TODO: Add more robust error handling
      console.log("Error getting trainer events");
    } else {
      res.json(results);
    }
  });
});

router.get("/trainer/:trainerId/fourWksSchedule", async (req, res) => {
  const trainerId = req.params.trainerId;
  const events = await event.getTrainerEventsforFourWks(trainerId);
  if (events.length <= 0) {
    res.send("No events");
  } else {
    res.json(events);
  }
});

router.get("/client/:clientId", (req, res) => {
  const clientId = req.params.clientId;
  event.getClientEvents(clientId, (err, results) => {
    if (err) {
      // TODO: Add more robust error handling
      console.log("Error getting client events");
    } else {
      res.json(results);
    }
  });
});

router.get("/client/:clientId/fourWksSchedule", async (req, res) => {
  const clientId = req.params.clientId;
  const events = await event.getClientEventsforFourWks(clientId);
  if (events.length <= 0) {
    res.send("No events");
  } else {
    res.json(events);
  }
});

module.exports = router;
