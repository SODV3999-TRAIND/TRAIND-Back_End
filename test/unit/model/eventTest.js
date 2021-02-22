const { assert, expect } = require("chai");
const { ObjectID } = require("mongodb");
const event = require("../../../models/event");
const dbServer = require("../../../models/dbServer");

suiteSetup(async function () {
  await dbServer.start("test");
});

suiteTeardown(async function () {
  dbServer.stop();
});

teardown(async function () {
  await dbServer.cleanup();
});

suite("Event Validation", function () {
  test("should return one event with a start date and time of Feb 16, 2021", async function () {
    await createEventCollection();
    assert.equal(
      await dbServer.get().collection("events").countDocuments({}),
      4
    );
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
  return { event1, event2, event3, event4 };
}