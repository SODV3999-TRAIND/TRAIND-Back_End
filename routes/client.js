const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Client");
});

router.post("/", (req, res) => {
  const { lastName, firstName } = req.body;
  res.send(
    `The last name is: ${lastName}, and the first name is: ${firstName}`
  );
});

module.exports = router;
