// 以函数形式暴露出去
module.exports = app => {
  const mongoose = require("mongoose");
  // 连接数据库
  mongoose.connect("mongodb://127.0.0.1:27017/moba_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // 将所有model引入一遍，防止报错
  require('require-all')(__dirname + '/../models')
};
