module.exports = options => {
  return async (req, res, next) => {
    // 获取resource并将其转换成首字母大写单数形式对应 => model模型名字
    const modelName = require("inflection").classify(req.params.resource);
    // 将引入的对应模型挂载到req上，方便每一个接口获取
    req.Model = require(`../models/${modelName}`);
    // 执行next方法
    next();
  };
};
