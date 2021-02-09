const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  attendee: mongoose.ObjectId,
  startDate: Date,
  endDate: Date,
  organizer: mongoose.ObjectId,
  location: { latitude: Number, longitude: Number },
});

/*
eventSchema.method("validateTime", function () {
  const trainer = this.organizer;
  const attendee = this.attendee;
  event.findById(trainer, "startDate", (err, date) => {
    if (err) {
      console.log("Event Error");
    } else {
      console.log(date.toString());
    }
  });
});
*/

const event = mongoose.model("event", eventSchema);

module.exports = event;
