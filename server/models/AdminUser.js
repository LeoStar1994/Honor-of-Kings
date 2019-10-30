const mongoose = require("mongoose");

// 定义schema => 对应collection 并定义schema中文档构成
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // 密码默认无法查出
    select: false,
    // 自定义保存的内容
    set: function(val) {
      // 使用bcrypt对密码进行hash同步不可逆散列 (散列指数通常为10-12位, 指数越高越耗时也越安全)
      return require("bcrypt").hashSync(val, 10);
    }
  }
});

// 创建模型
module.exports = mongoose.model("AdminUser", schema);
