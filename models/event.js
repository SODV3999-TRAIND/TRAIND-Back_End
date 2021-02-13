const { ObjectID } = require("mongodb");
const mdb = require("./index");
const addWeeks = require("date-fns/addWeeks");

// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

// TODO: Convert to async/await
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

// TODO: Convert to async/await
function getTrainerEvents(trainerId, callback) {
  mdb
    .get()
    .collection("events")
    .find({ organizer: ObjectID(trainerId) })
    .toArray((err, events) => {
      callback(err, events);
    });
}

async function getTrainerEventsforFourWks(trainerId) {
  const curDate = new Date(new Date().setHours(0, 0, 0));
  const fourWks = addWeeks(curDate, 4);

  try {
    if (!ObjectID.isValid(trainerId)) {
      // TODO: Added custom error handling for mal-formed ObjectID
      throw error;
    }
    const cursor = await mdb
      .get()
      .collection("events")
      .find({
        organizer: ObjectID(trainerId),
        startDate: {
          $gte: curDate,
          $lt: fourWks,
        },
      });
    const events = await cursor.toArray();
    return events;
  } catch (error) {
    // TODO: Add more robust error handling here.
    console.log("getTrainerEventsForFourWks Error");
  }
}

// TODO: Convert to async/await
function getClientEvents(clientId, callback) {
  mdb
    .get()
    .collection("events")
    .find({ attendee: ObjectID(clientId) })
    .toArray((err, events) => {
      callback(err, events);
    });
}

async function getClientEventsforFourWks(clientId) {
  const curDate = new Date(new Date().setHours(0, 0, 0));
  const fourWks = addWeeks(curDate, 4);

  try {
    if (!ObjectID.isValid(clientId)) {
      // TODO: Added custom error handling for mal-formed ObjectID
      throw error;
    }
    const cursor = await mdb
      .get()
      .collection("events")
      .find({
        attendee: ObjectID(clientId),
        startDate: {
          $gte: curDate,
          $lt: fourWks,
        },
      });
    const events = await cursor.toArray();
    return events;
  } catch (error) {
    // TODO: Add more robust error handling here.
    console.log("getClientEventsForFourWks Error");
  }
}

module.exports = {
  newEvent,
  getTrainerEvents,
  getClientEvents,
  getClientEventsforFourWks,
  getTrainerEventsforFourWks,
};
