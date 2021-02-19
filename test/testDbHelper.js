const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

class testDbHelper {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    const url = await this.server.getUri();
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.connection.db(await this.server.getDbName());
  }

  stop() {
    this.connection.close();
    this.server.stop();
  }

  async cleanup() {
    const collections = await this.db.listCollections().toArray();
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map((collection) => this.db.collection(collection).drop())
    );
  }

  async createDoc(collectionName, document) {
    const { ops } = await this.db
      .collection(collectionName)
      .insertOne(document);
    return ops[0];
  }
}
module.exports = testDbHelper;
