const mongoose = require("mongoose");

// 定义schema => 对应collection 并定义schema中文档构成
const schema = new mongoose.Schema(
  {
    // 文章标题
    title: { type: String },
    // 分类 一个英雄可能对应多个分类 => 关联Category
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    body: { type: String }
  },
  { timestamps: true } // 带上时间戳(创建、更新)
);

// 创建模型
module.exports = mongoose.model("Article", schema);
