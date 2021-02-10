const express = require("express");
const router = express.Router();
// const trainRoute = require("./trainer");
const clientRoute = require("./client");
const eventRoute = require("./event");

// router.get("/hello", (req, res) => {
//   res.send(`Hello from Router ${Test}`);
// });

// router.use("/trainer", trainRoute);
router.use("/client", clientRoute);
router.use("/event", eventRoute);

module.exports = router;
