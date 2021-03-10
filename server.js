const express = require("express");
const bodyParser = require("body-parser");
const dbServer = require("./models/dbServer");

//TODO: Add flags for production.
if (process.env.NODE_ENV == "development") {
  dbServer.start();
}

const app = express();
const router = require("./routes");

const port = 3000;

app.get("/test", (req, res) => {
  console.log("/test called");
  res.json({ reply: "Hello from Express" });
});

app.use(bodyParser.json());

app.use("/api", router);

app.all("*", (req, res, next) => {
  // TODO: Look at adding custom error handling here.
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json(message);
});

app.listen(port, () => {
  console.log(`Express is listening of port ${port}`);
});

module.exports = app;
