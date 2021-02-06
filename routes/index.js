const express = require("express");
const router = express.Router();
const trainRoute = require("./trainer");
const clientRoute = require("./client");
const db = require("../models/index");

const Test = db.id;

router.get("/hello", (req, res) => {
  res.send(`Hello from Router ${Test}`);
});

router.use("/trainer", trainRoute);
router.use("/client", clientRoute);

module.exports = router;
