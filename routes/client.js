const express = require("express");
const multer = require("multer");
const fs = require("fs");
const client = require("../models/client");
const httpErrors = require("http-errors");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
});

const upload = multer({ storage: storage });

router.get("/:clientID", (req, res) => {
  // TODO: Add back next() call.
  client.getClient(req.params.clientID, (err, result) => {
    if (err) {
      // TODO: Add more robust error handling here. Consider using next() to provide info back to React.
      console.log("Error finding client");
    } else if (!result) {
      res.send("Client Not Found");
    } else {
      res.json(result);
    }
  });
});

router.post("/", upload.single("data"), (req, res) => {
  // TODO: Add back next() call
  const { familyName, givenName, telephone, email } = req.body;
  const data = fs.readFileSync(req.file.path);

  client.newClient(
    givenName,
    familyName,
    email,
    telephone,
    data,
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
