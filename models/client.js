const { ObjectID } = require("mongodb");
const mdb = require("./index");
// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

function newClient(givenName, familyName, email, telephone, callback) {
  mdb.get().collection("clients").insertOne(
    {
      givenName: givenName,
      familyName: familyName,
      email: email,
      telephone: telephone,
    },
    callback
  );
}

function getClient(clientID, callback) {
  mdb
    .get()
    .collection("clients")
    .findOne(
      { _id: ObjectID(clientID) },
      { givenName: 1, familyName: 1 },
      callback
    );
}

module.exports = { getClient, newClient };
