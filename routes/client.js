const express = require("express");
const Client = require("../models/client");
const httpErrors = require("http-errors");

const router = express.Router();

router.get("/:clientID", (req, res, next) => {
  Client.findById(req.params.clientID, "firstName", (err, client) => {
    if (err) {
      next(httpErrors(404, "Client Not Found"));
    } else {
      res.send(`The client name is ${client.firstName}`);
    }
  });
});

router.post("/", (req, res, next) => {
  const { lastName, firstName, phoneNumber, email } = req.body;

  const newClient = new Client({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
  });

  newClient.save(function (err) {
    if (err) {
      next(httpErrors(500, "Save unsuccessful"));
    } else {
      res.send(
        `The last name is: ${newClient.lastName}, the first name is: ${newClient.firstName}, the phone number is ${newClient.phoneNumber}, and the email address is ${newClient.email}`
      );
    }
  });
});

module.exports = router;
