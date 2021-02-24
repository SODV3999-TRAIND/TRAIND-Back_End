const { assert, expect } = require("chai");
const BaseError = require("../../../error");
const client = require("../../../models/client");
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

suite("Client Schema", function () {
  test("should return false when provided with duplicate information", async function () {
    await createClientCollection();
    const result = await client.checkNewClientIsUnique(
      "Ladonna",
      "Dunlop",
      "841-895-5232",
      "ldunlop0@slideshare.net"
    );
    assert.isFalse(result);
  });

  test("should return true when provided with unique information", async function () {
    await createClientCollection();
    const result = await client.checkNewClientIsUnique(
      "Michael",
      "Persson",
      "555-555-5555",
      "m.persson891@mybvc.ca"
    );
    assert.isTrue(result);
  });

  test("should throw a 400 error when a malformed ObjectId is provided", async function () {
    try {
      await client.getClient("6020b6eafc13ae32b100000");
    } catch (error) {
      assert.instanceOf(error, BaseError, "Incorrect error type");
      assert.equal(error.name, "castErrorDB", "Incorrect error name");
      assert.equal(error.httpCode, 400, "Incorrect httpCode");
      assert.equal(
        error.message,
        "Malformed ObjectID",
        "Incorrect error message"
      );
    }
  });
});

async function createClientCollection() {
  const client1 = await dbServer.createDoc("clients", {
    givenName: "Ladonna",
    familyName: "Dunlop",
    email: "ldunlop0@slideshare.net",
    telephone: "841-895-5232",
  });

  const client2 = await dbServer.createDoc("clients", {
    givenName: "Pascal",
    familyName: "Tomaszek",
    email: "ptomaszek1@webs.com",
    telephone: "308-973-9134",
  });

  const client3 = await dbServer.createDoc("clients", {
    givenName: "Gordan",
    familyName: "McLernon",
    email: "gmclernon2@mac.com",
    telephone: "501-461-6897",
  });

  const client4 = await dbServer.createDoc("clients", {
    givenName: "Sheilah",
    familyName: "Phayre",
    email: "sphayre3@usa.gov",
    telephone: "105-154-4083",
  });
  return { client1, client2, client3, client4 };
}
