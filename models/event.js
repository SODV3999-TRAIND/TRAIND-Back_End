const { ObjectID } = require("mongodb");
const baseError = require("../error");
const mdb = require("./index");
const addWeeks = require("date-fns/addWeeks");
const { isValidISODateString } = require("iso-datestring-validator");

// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

async function newEvent(attendee, startDate, endDate, organizer, location) {
  try {
    if (!ObjectID.isValid(organizer) || !ObjectID.isValid(attendee)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
    }
    if (!isValidISODateString(startDate) || !isValidISODateString(endDate)) {
      throw new baseError("castErrorDB", 400, "Malformed Date", true);
    }
    const event = await mdb
      .get()
      .collection("events")
      .insertOne({
        organizer: ObjectID(organizer),
        attendee: ObjectID(attendee),
        // TODO: Add iso-datestring-validator for startDate and endDate
        startDate: startDate,
        endDate: endDate,
        location: location,
      });
    return event;
  } catch (error) {
    throw error;
  }
}

async function getTrainerEvents(trainerId) {
  try {
    if (!ObjectID.isValid(trainerId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
    }
    const events = await mdb
      .get()
      .collection("events")
      .find({ organizer: ObjectID(trainerId) })
      .toArray();
    return events;
  } catch (error) {
    throw error;
  }
}

async function getTrainerEventsforFourWks(trainerId) {
  const curDate = new Date(new Date().setHours(0, 0, 0));
  const fourWks = addWeeks(curDate, 4);

  try {
    if (!ObjectID.isValid(trainerId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
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
    throw error;
  }
}

async function getClientEvents(clientId) {
  try {
    if (!ObjectID.isValid(clientId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
    }
    const events = await mdb
      .get()
      .collection("events")
      .find({ attendee: ObjectID(clientId) })
      .toArray();
    return events;
  } catch (error) {
    throw error;
  }
}

async function getClientEventsforFourWks(clientId) {
  const curDate = new Date(new Date().setHours(0, 0, 0));
  const fourWks = addWeeks(curDate, 4);

  try {
    if (!ObjectID.isValid(clientId)) {
      // TODO: Added custom error handling for mal-formed ObjectID
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
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
    throw error;
  }
}

module.exports = {
  newEvent,
  getTrainerEvents,
  getClientEvents,
  getClientEventsforFourWks,
  getTrainerEventsforFourWks,
};
