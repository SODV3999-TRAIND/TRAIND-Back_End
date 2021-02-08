const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  attendee: mongoose.ObjectId,
  startDate: Date,
  endDate: Date,
  organizer: mongoose.ObjectId,
  location: { latitude: Number, longitude: Number },
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
