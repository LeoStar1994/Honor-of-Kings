const express = require("express");
const CORS = require("cors");

const app = express();

// 设置生产jwt所需的密钥
app.set("secret", "89j983jiudbaug2o30123");

// 跨域
app.use(CORS());
// 解析post请求数据 body-parser
app.use(express.json());
// 上传文件静态化
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./db/db.js")(app);
require("./routes/admin/index.js")(app);
require("./routes/web/index.js")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
