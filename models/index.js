const { MongoClient } = require("mongodb");

let mdb;
MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  // TODO: Extract the database connection string to the global config file.
  //TODO: Add assert if there is an error connecting to the server.
  console.log("Connected to server");
  mdb = client.db("TRAIND");
  console.log(`Connected to Database ${mdb.databaseName}`);
  // TODO: Need to close the connection when the application closes.
});

// Allows a connection to the database to be exported to other modules.
function get() {
  return mdb;
}

module.exports.get = get;
