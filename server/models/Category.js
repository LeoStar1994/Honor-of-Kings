const mongoose = require("mongoose");

// 定义schema => 对应collection 并定义schema中文档的构成
const schema = new mongoose.Schema({
  name: { type: String },
  // 上级分类  ObjectId类型  ref => 关联的模型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" }
});

schema.virtual("children", {
  localField: "_id", // 本表需要关联的字段（键）
  foreignField: "parent", // 被连接表需要关联的字段key
  justOne: false, // children是否是一个单独的doc
  ref: "Category" // 使用的model模型
});

schema.virtual("newsList", {
  localField: "_id",
  foreignField: "categories",
  justOne: false,
  ref: "Article"
});

schema.virtual("videoList", {
  localField: "_id",
  foreignField: "categories",
  justOne: false,
  ref: "Video"
});

// 创建模型
module.exports = mongoose.model("Category", schema);
