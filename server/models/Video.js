const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    categories: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
    title: { type: String },
    banner: { type: String },
    viewCounts: { type: String },
    playUrl: { type: String },
    time: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", schema, "videos");
