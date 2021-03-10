const dbServer = require("../../../models/dbServer");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../../../server");

chai.use(chaiHttp);

suiteSetup(async function () {
  await dbServer.start("test");
});

suiteTeardown(async function () {
  dbServer.stop();
});

teardown(async function () {
  await dbServer.cleanup();
});

suite("/client", function () {
  suite("GET", function () {
    test("when provided with a non-existant client ID, should return a 404 error", function (done) {
      chai
        .request(app)
        .get("/api/client/6020b6eafc13ae32b1000110")
        .end(function (err, res) {
          res.should.have.status(404);
          done(err);
        });
    });
  });
  suite("GET", function () {
    test("when provided with a malformed client ID, should return a 400 error", function (done) {
      chai
        .request(app)
        .get("/api/client/6020b6eafc13ae32b100010")
        .end(function (err, res) {
          res.should.have.status(400);
          done(err);
        });
    });
  });
});
