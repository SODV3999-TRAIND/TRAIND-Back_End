const express = require("express");
const multer = require("multer");
const fs = require("fs");
const clients = require("../models/client");
const baseError = require("../error");
const httpErrors = require("http-errors");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
});

const upload = multer({ storage: storage });

/**
 * Finds client based on MongoDB _id.
 * See Swagger documentation
 */
router.get("/:clientID", async (req, res) => {
  try {
    const client = await clients.getClient(req.params.clientID);
    if (!client) {
      throw new baseError("notFound", 404, "Client Not Found", false);
    } else {
      res.json(client);
    }
  } catch (error) {
    res.status(error.httpCode).json({ message: error.message });
  }
});

/**
 * Creates a new client
 * See Swagger documentation
 */

router.post("/", upload.single("data"), (req, res) => {
  const { familyName, givenName, telephone, email } = req.body;
  const data = fs.readFileSync(req.file.path);
  try {
    const clientID = clients.newClient(
      givenName,
      familyName,
      email,
      telephone,
      data
    );
    if (!clientID) {
      throw new baseError(
        "writeError",
        500,
        "Client could not be created",
        false
      );
    } else {
      res.json({ _id: clientID });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
