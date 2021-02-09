const express = require("express");
const httpErrors = require("http-errors");
const mongoose = require("mongoose");
const eventModel = require("../models/event");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Trainer");
});

router.post("/:trainerId/book", (req, res, next) => {
  // Confirm trainer exists
  eventModel.find({ organizer: req.params.trainerId }, (err, result) => {
    if (result.length <= 0) {
      console.log("Error");
      next(httpErrors(404, "Trainer Error"));
    } else {
      // Create a new event
      const newEvent = new eventModel({
        organizer: mongoose.Types.ObjectId(req.params.trainerId),
        startDate: Date(),
        endDate: Date(),
        attendee: mongoose.Types.ObjectId("6020b6eafc13ae32b1000001"),
        location: { latitude: 22.6285798, longitude: 90.2690466 },
      });
      res.send(`Event ID: ${newEvent._id}`);
    }
  });
});

module.exports = router;
