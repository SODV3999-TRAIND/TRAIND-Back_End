const express = require("express");
const event = require("../models/event");
const { isValidISODateString } = require("iso-datestring-validator");
const baseError = require("../error");

const router = express.Router();

router.post("/book", async (req, res) => {
  const { attendee, organizer, startDate, endDate, location } = req.body;
  try {
    // TODO: Return the event id to client.
    await event.newEvent(attendee, startDate, endDate, organizer, location);
  } catch (error) {
    res.status(error.httpCode).json({ message: error.message });
  }
});

router.get("/trainer/:trainerId", async (req, res) => {
  const trainerId = req.params.trainerId;
  try {
    const events = await event.getTrainerEvents(trainerId);
    res.json(events);
  } catch (error) {
    res.status(error.httpCode).json({ message: error.message });
  }
});

router.get("/trainer/:trainerId/schedule", async (req, res) => {
  const trainerId = req.params.trainerId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    if (!isValidISODateString(startDate) || !isValidISODateString(endDate)) {
      throw new baseError(
        "validationErrorAPI",
        400,
        "Malformed Date String",
        true
      );
    }
    const events = await event.getTrainerEventsforFourWks(trainerId);
    res.status(200).json(events);
  } catch (error) {
    res.status(error.httpCode).json({ message: error.message });
  }
});

router.get("/client/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const events = await event.getClientEvents(clientId);
    res.json(events);
  } catch (error) {
    res.status(error.httpCode).json({ message: error.message });
  }
});

router.get("/client/:clientId/schedule", async (req, res) => {
  const clientId = req.params.clientId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    if (!isValidISODateString(startDate) || !isValidISODateString(endDate)) {
      throw new baseError(
        "validationErrorAPI",
        400,
        "Malformed Date String",
        true
      );
    }
    const events = await event.getClientEventsforFourWks(clientId);
    res.status(200).json(events);
  } catch (error) {
    res.status(error.httpCode).json({ message: error.message });
  }
});

module.exports = router;
