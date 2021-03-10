const { assert, expect } = require("chai");
const { ObjectID, ISODate } = require("mongodb");
const event = require("../../../models/event");
const dbServer = require("../../../models/dbServer");
const BaseError = require("../../../error");

suiteSetup(async function () {
  await dbServer.start("test");
});

suiteTeardown(async function () {
  dbServer.stop();
});

teardown(async function () {
  await dbServer.cleanup();
});

suite("General Event Validation", function () {
  test("should return eight events", async function () {
    await createEventCollection();
    assert.equal(
      await dbServer.get().collection("events").countDocuments({}),
      8
    );
  });
});

suite("Trainer Event Validation", function () {
  test("should return an array with a count of four", async function () {
    await createEventCollection();
    const result = await event.getTrainerSchedule(
      "6020b637fc13ae4ce100000b",
      // Start: 5:30 pm
      "2021-05-05T17:20:00.000+00:00",
      // End: 6:30 pm
      "2021-05-05T18:30:00.000+00:00"
    );
    const count = result.length;
    assert.equal(count, 4, "Client schedule retrieve incorrect");
  });

  test("should throw a 400 error when a malformed ObjectId is provided", async function () {
    await createEventCollection();
    try {
      await event.getTrainerSchedule(
        // This ObjectId is one character too short.
        "6020b637fc13ae4ce100000",
        "2021-05-05T17:20:00.000+00:00",
        "2021-05-05T18:30:00.000+00:00"
      );
    } catch (error) {
      assert.instanceOf(error, BaseError, "Incorrect error type");
      assert.equal(error.name, "castErrorDB", "Incorrect error name");
      assert.equal(error.httpCode, 400, "Incorrect httpCode");
      assert.equal(
        error.message,
        "Malformed ObjectId",
        "Incorrect error message"
      );
    }
  });

  test("should return a single event", async function () {
    await createEventCollection();
    const result = await event.isTrainerAvailabe(
      "6020b637fc13ae4ce1000000",
      "2020-09-29T16:05:26.000Z",
      "2020-09-29T16:39:26.000Z"
    );
    assert.isFalse(result);
  });
});

suite("Client Event Validation", function () {
  test("should return an array with a count of four", async function () {
    await createEventCollection();
    const result = await event.getClientSchedule(
      "6020b6eafc13ae32b100000b",
      // Start: 5:30 pm
      "2021-05-05T17:20:00.000+00:00",
      // End: 6:30 pm
      "2021-05-05T18:30:00.000+00:00"
    );
    const count = result.length;
    assert.equal(count, 4, "Client schedule retrieve incorrect");
  });

  test("should throw a 400 error when a malformed ObjectId is provided", async function () {
    await createEventCollection();
    try {
      await event.getClientSchedule(
        // This ObjectId is one character too short.
        "6020b6eafc13ae32b100000",
        "2021-05-05T17:20:00.000+00:00",
        "2021-05-05T18:30:00.000+00:00"
      );
    } catch (error) {
      assert.instanceOf(error, BaseError, "Incorrect error type");
      assert.equal(error.name, "castErrorDB", "Incorrect error name");
      assert.equal(error.httpCode, 400, "Incorrect httpCode");
      assert.equal(
        error.message,
        "Malformed ObjectId",
        "Incorrect error message"
      );
    }
  });
});

async function createEventCollection() {
  const event1 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b1000000"),
    organizer: ObjectID("6020b637fc13ae4ce1000000"),
    startDate: "2021-02-09T15:03:36Z",
    endDate: "2021-02-09T17:03:36Z",
    location: {
      longitude: 32.3912619,
      latitude: 53.0175632,
    },
  });

  const event2 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b1000000"),
    startDate: "2020-09-28T16:05:26.000Z",
    endDate: "2020-09-28T16:39:26.000Z",
    organizer: ObjectID("6020b637fc13ae4ce1000000"),
    location: {
      latitude: 22.6285798,
      longitude: 90.2690466,
    },
  });

  const event3 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b1000001"),
    startDate: "2020-03-07T03:11:05.000Z",
    endDate: "2020-03-07T03:56:05.000Z",
    organizer: ObjectID("6020b637fc13ae4ce1000001"),
    location: {
      latitude: 56.359356,
      longitude: 61.8768972,
    },
  });

  const event4 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b1000002"),
    startDate: "2020-03-07T03:11:05.000Z",
    endDate: "2020-03-07T03:56:05.000Z",
    organizer: ObjectID("6020b637fc13ae4ce1000002"),
    location: {
      latitude: 56.359356,
      longitude: 61.8768972,
    },
  });

  // Scenario 1: Start: 5:20 pm, End: 6:40 pm
  const event5 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b100000b"),
    startDate: new Date("2021-05-05T18:20:00.000+00:00"),
    endDate: new Date("2021-05-05T18:20:00.000+00:00"),
    organizer: ObjectID("6020b637fc13ae4ce100000b"),
    location: { latitude: 27.30459, longitude: 68.39764 },
  });

  // Scenario 2: Start: 5:10 pm, End: 6:00 pm
  const event6 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b100000b"),
    startDate: new Date("2021-05-05T18:20:00.000+00:00"),
    endDate: new Date("2021-05-05T18:20:00.000+00:00"),
    organizer: ObjectID("6020b637fc13ae4ce100000b"),
    location: { latitude: 27.30459, longitude: 68.39764 },
  });

  // Scenario 3: Start: 6:20 pm End: 7:10 pm
  const event7 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b100000b"),
    startDate: new Date("2021-05-05T18:20:00.000+00:00"),
    endDate: new Date("2021-05-05T18:20:00.000+00:00"),
    organizer: ObjectID("6020b637fc13ae4ce100000b"),
    location: { latitude: 27.30459, longitude: 68.39764 },
  });

  // Scenario 4: Start: 5:40 pm End: 6:10 pm
  const event8 = await dbServer.createDoc("events", {
    attendee: ObjectID("6020b6eafc13ae32b100000b"),
    startDate: new Date("2021-05-05T18:20:00.000+00:00"),
    endDate: new Date("2021-05-05T18:20:00.000+00:00"),
    organizer: ObjectID("6020b637fc13ae4ce100000b"),
    location: { latitude: 27.30459, longitude: 68.39764 },
  });
  return { event1, event2, event3, event4, event5, event6, event7, event8 };
}
