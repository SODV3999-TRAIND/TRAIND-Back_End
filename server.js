const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = require("./routes");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.use(bodyParser.json());

app.use("/router", router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Express is listening of port ${port}`);
});