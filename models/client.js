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

async function checkNewClientIsUnique(givenName, familyName, telephone, email) {
  try {
    // TODO: Add input validation before Mongo call.
    if (
      (await mdb
        .get()
        .collection("clients")
        .find({
          givenName: givenName,
          familyName: familyName,
          telephone: telephone,
          email: email,
        })
        .limit(1)) == null
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}

module.exports = { getClient, newClient };
