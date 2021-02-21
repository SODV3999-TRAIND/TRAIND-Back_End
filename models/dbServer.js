const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

var _db;
var _connection;
var _server;

class dbServer {
  static async start(environment) {
    if (environment == "test") {
      _server = new MongoMemoryServer();
      const url = await _server.getUri();
      _connection = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      _db = _connection.db(await _server.getDbName());
      console.log(`Connected to Database ${_db.databaseName}`);
    } else {
      _connection = await MongoClient.connect("mongodb://localhost:27017");
      _db = _connection.db("TRAIND");
      console.log(`Connected to Database ${_db.databaseName}`);
    }
  }

  static stop() {
    _connection.close();
    _server.stop();
  }

  static async cleanup() {
    const collections = await _db.listCollections().toArray();
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map((collection) => _db.collection(collection).drop())
    );
  }

  static async createDoc(collectionName, document) {
    const { ops } = await _db.collection(collectionName).insertOne(document);
    return ops[0];
  }
  // Allows a connection to the database to be exported to other modules.
  static get() {
    return _db;
  }
}
module.exports = dbServer;
