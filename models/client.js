const { ObjectID, Binary } = require("mongodb");
const mdb = require("./index");
// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

function newClient(givenName, familyName, email, telephone, data, callback) {
  mdb
    .get()
    .collection("clients")
    .insertOne(
      {
        givenName: givenName,
        familyName: familyName,
        email: email,
        telephone: telephone,
        image: { data: Binary(data), contentType: "image/jpeg" },
      },
      callback
    );
}

function getClient(clientID, callback) {
  mdb
    .get()
    .collection("clients")
    .findOne({ _id: ObjectID(clientID) }, callback);
}

module.exports = { getClient, newClient };
