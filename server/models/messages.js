const mongoose = require("mongoose");

const MesSchema = new mongoose.Schema({
  name: {
    name : String,
    message : String
  }
});

const Messages = mongoose.model("Messages", MesSchema);

module.exports = Messages;