const { ObjectID } = require("mongodb");
const baseError = require("../error");
const dbServer = require("./dbServer");
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
    const event = await dbServer
      .get()
      .collection("events")
      .insertOne({
        organizer: ObjectID(organizer),
        attendee: ObjectID(attendee),
        // TODO: Convert startDate to ISODate before saving to the dB.
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
    const events = await dbServer
      .get()
      .collection("events")
      .find({ organizer: ObjectID(trainerId) })
      .toArray();
    return events;
  } catch (error) {
    throw error;
  }
}

async function getTrainerSchedule(trainerId, startDate, endDate) {
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  try {
    if (!ObjectID.isValid(trainerId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectId", true);
    }

    const events = await dbServer
      .get()
      .collection("events")
      .find({
        $and: [
          { organizer: ObjectID(trainerId) },
          {
            $or: [
              {
                $and: [
                  { startDate: { $gte: startD } },
                  { startDate: { $lte: endD } },
                ],
              },
              { startDate: { $lte: startD }, endDate: { $gte: startD } },
            ],
          },
        ],
      })
      .toArray();
    return events;
  } catch (error) {
    throw error;
  }
}

async function getClientEvents(clientId) {
  try {
    if (!ObjectID.isValid(clientId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
    }
    const events = await dbServer
      .get()
      .collection("events")
      .find({ attendee: ObjectID(clientId) })
      .toArray();
    return events;
  } catch (error) {
    throw error;
  }
}

async function getClientSchedule(clientId, startDate, endDate) {
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  try {
    if (!ObjectID.isValid(clientId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectId", true);
    }

    const events = await dbServer
      .get()
      .collection("events")
      .find({
        $and: [
          { attendee: ObjectID(clientId) },
          {
            $or: [
              {
                $and: [
                  { startDate: { $gte: startD } },
                  { startDate: { $lte: endD } },
                ],
              },
              { startDate: { $lte: startD }, endDate: { $gte: startD } },
            ],
          },
        ],
      })
      .toArray();
    return events;
  } catch (error) {
    throw error;
  }
}

async function isTrainerAvailabe(trainerId, startDate, endDate) {
  try {
    if (!ObjectID.isValid(trainerId)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
    }
    const events = await dbServer
      .get()
      .collection("events")
      .find({
        organizer: ObjectID(trainerId),
        startDate: { $gte: startDate, $lte: endDate },
        endDate: { $gte: endDate, $lte: endDate },
      });
    if (events != null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  newEvent,
  getTrainerEvents,
  getTrainerSchedule,
  getClientEvents,
  getClientSchedule,
  isTrainerAvailabe,
};
