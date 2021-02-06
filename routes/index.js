const express = require("express");
const router = express.Router();
const trainRoute = require("./trainer");
const clientRoute = require("./client");

router.get("/hello", (req, res) => {
  res.send("Hello from Router");
});

router.use("/trainer", trainRoute);
router.use("/client", clientRoute);

module.exports = router;
