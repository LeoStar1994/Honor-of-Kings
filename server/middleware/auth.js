module.exports = options => {
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/AdminUser.js");

  return async (req, res, next) => {
    // 获取token
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    // token不存在
    assert(token, 401, "请先登录");
    // 校验token是否正确
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录");
    // 数据库模型中此用户是否存在
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
