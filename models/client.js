const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
