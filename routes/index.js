const express = require("express");
const router = express.Router();
const clientRoute = require("./client");
const eventRoute = require("./event");

router.use("/client", clientRoute);
router.use("/event", eventRoute);

module.exports = router;
