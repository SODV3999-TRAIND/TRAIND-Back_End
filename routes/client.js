const express = require("express");
const client = require("../models/client");
const httpErrors = require("http-errors");

const router = express.Router();

router.get("/:clientID", (req, res) => {
  // TODO: Add back next() call.
  client.getClient(req.params.clientID, (err, result) => {
    if (err) {
      // TODO: Add more robust error handling here. Consider using next() to provide info back to React.
      console.log("Error finding client");
    } else if (!result) {
      res.send("Client Not Found");
    } else {
      res.send(`Client First Name: ${result.givenName}`);
    }
  });
});

router.post("/", (req, res) => {
  // TODO: Add back next() call
  const { lastName, firstName, telephone, email } = req.body;

  client.newClient(
    firstName,
    lastName,
    email,
    telephone,
    function (error, result) {
      if (error) {
        // TODO: Add more robust error handling here. Consider using next() to provide info back to React.
        console.log("Insert Client Failed error");
      } else {
        res.send(`New client id: ${result.insertedId}`);
      }
    }
  );
});

module.exports = router;
