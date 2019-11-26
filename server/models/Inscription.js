const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  effect1: { type: String },
  effect2: { type: String }
});

module.exports = mongoose.model("Inscription", schema, "inscriptions");
