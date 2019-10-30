const mongoose = require("mongoose");

// 定义schema => 对应collection 并定义schema中文档构成
const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
});

// 创建模型
module.exports = mongoose.model("Item", schema);
