const mongoose = require("mongoose");

// 定义schema => 对应collection 并定义schema中文档构成
const schema = new mongoose.Schema({
  // 名字
  name: { type: String },
  // 头像
  avatar: { type: String },
  // 背景图
  banner: { type: String },
  // 称号
  title: { type: String },
  // 分类 一个英雄可能对应多个分类 => 关联Category
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  // 评分
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 技能
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
      delay: { type: String },
      cost: { type: String }
    }
  ],
  // 召唤师技能
  summonerSkills: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Skill" }],
  // 铭文
  inscriptions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Inscription" }],
  // 顺风出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  items1Tips: { type: String },
  // 逆风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  items2Tips: { type: String },
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团队技巧
  teamTips: { type: String },
  // 搭档
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String }
    }
  ],
  foes: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String }
    }
  ],
  restrains: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String }
    }
  ]
});

// 创建模型
module.exports = mongoose.model("Hero", schema, "heroes");
