module.exports = app => {
  const express = require("express");
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../../models/AdminUser");

  // 引入router
  const router = express.Router({
    mergeParams: true // 导入(合并)父级参数到子级配置
    // caseSensitive: true, // 区分大小写配置
    // strict: true // 是否开启路径严格模式 开启后 /test 与 /test/是不同路径
  });

  // 新建分类
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 编辑更新分类
  router.put("/:id", async (req, res) => {
    // 通过id查找并更新数据
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除分类
  router.delete("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      code: 200,
      desc: "删除成功"
    });
  });

  // 查询资源列表数据
  router.get("/", async (req, res) => {
    const queryOptions = {};
    // 如果是Category这个模型
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    // populate => 关联parent, 不加只返回parent._id, 关联后返回parent全部信息
    const items = await req.Model.find().setOptions(queryOptions);
    // .limit(10);
    res.send(items);
  });

  // 编辑反显资源数据
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 登录校验中间件
  const resourceMiddleware = require("../../middleware/resource");
  const authMiddleware = require("../../middleware/auth");

  // 通用rest接口
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  // 处理上传文件数据
  const multer = require("multer");
  // 上传中间件 dest：上传地址
  const upload = multer({ dest: __dirname + "/../../uploads" });
  // upload.single('上传文件字段名称（el-upload默认是file）') => 接收单个文件上传
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      // 拼接图片地址作为url挂载至file上
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  // login登录接口
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 存储时密码设置了select默认不可见， 需把password带出来
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, "用户不存在");

    // 校验密码  compareSync(密码， 数据库散列存储的字符) => 进行对比
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    // 根据_id + 密钥生成token
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
