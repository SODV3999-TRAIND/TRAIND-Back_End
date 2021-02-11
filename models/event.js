const { ObjectID } = require("mongodb");
const mdb = require("./index");
// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

function newEvent(attendee, startDate, endDate, organizer, location, callback) {
  mdb
    .get()
    .collection("events")
    .insertOne(
      {
        // TODO: Add checking to make sure the organizer and attendee actually exist.
        organizer: ObjectID(organizer),
        attendee: ObjectID(attendee),
        // TODO: Add iso-datestring-validator for startDate and endDate
        startDate: startDate,
        endDate: endDate,
        location: location,
      },
      callback
    );
}

function getTrainerEvents(trainerId, callback) {
  mdb
    .get()
    .collection("events")
    .find({ organizer: ObjectID(trainerId) })
    .toArray((err, events) => {
      callback(err, events);
    });
}

function getClientEvents(clientId, callback) {
  mdb
    .get()
    .collection("events")
    .find({ attendee: ObjectID(clientId) })
    .toArray((err, events) => {
      callback(err, events);
    });
}

module.exports = { newEvent, getTrainerEvents, getClientEvents };
