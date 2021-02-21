const { ObjectID, Binary } = require("mongodb");
const dbServer = require("./dbServer");
// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

function newClient(givenName, familyName, email, telephone, data, callback) {
  dbServer
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
  dbServer
    .get()
    .collection("clients")
    .findOne({ _id: ObjectID(clientID) }, callback);
}

async function checkNewClientIsUnique(givenName, familyName, telephone, email) {
  try {
    // TODO: Add input validation before Mongo call.
    const count = await dbServer.get().collection("clients").countDocuments(
      {
        givenName: givenName,
        familyName: familyName,
        telephone: telephone,
        email: email,
      },
      { limit: 1 }
    );
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}

module.exports = { getClient, newClient, checkNewClientIsUnique };
