const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
});

// 创建模型
module.exports = mongoose.model("Skill", schema);
