const { ObjectID, Binary } = require("mongodb");
const baseError = require("../error");
const dbServer = require("./dbServer");
// TODO: Add express-validator.
// TODO: Add code to pass db errors to the router.

/**
 * Returns client information associated with provide client _id
 * @param {string} clientID
 * @returns {json} client
 * @throws {baseError} clientID must conform to MongoDB ObjectID.
 */
async function getClient(clientID) {
  try {
    if (!ObjectID.isValid(clientID)) {
      throw new baseError("castErrorDB", 400, "Malformed ObjectID", true);
    }
    const client = await dbServer
      .get()
      .collection("clients")
      .findOne({ _id: ObjectID(clientID) });
    return client;
  } catch (error) {
    throw error;
  }
}

/**
 *Adds new client to the MongoDB.
 * @param {string} givenName
 * @param {string} familyName
 * @param {string} email
 * @param {string} telephone
 * @param {binary} data
 * @returns {string} client _id
 * @throws {error} if insert fails
 */
async function newClient(givenName, familyName, email, telephone, data) {
  // TODO: Need to make the data optional.
  try {
    const client = await dbServer
      .get()
      .collection("clients")
      .insertOne({
        givenName: givenName,
        familyName: familyName,
        email: email,
        telephone: telephone,
        image: { data: Binary(data), contentType: "image/jpeg" },
      });
    return client._id;
  } catch (error) {
    throw error;
  }
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
