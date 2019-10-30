module.exports = app => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  // const Category = require("../../models/Category");
  // const Article = require("../../models/Article");

  // 通过mongoose获取分类、文章的model
  const Category = mongoose.model("Category");
  const Article = mongoose.model("Article");
  // 初始化news数据接口

  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    // 获取纯粹json格式的新闻分类下的子分类数据
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean();
    const newsTitles = [
      "夏日新版本“稷下星之队”即将6月上线",
      "王者荣耀携手两大博物馆 走进稷下学宫",
      "王者大陆第一学院【稷下】档案",
      "跨界合作丨控油神装登场，唤醒无限护肤力量！",
      "像素游戏时代“老四强”重聚《魂斗罗：归来》，新版本、新英雄燃爆两周年庆",
      "6月11日全服不停机更新公告",
      "【已修复】王者大陆的端午宝藏活动页面异常问题说明",
      "6月7日体验服停机更新公告",
      "6月4日全服不停机更新公告",
      "关于2019年KPL春季赛总决赛 RNG.M vs eStarPro 补赛、赛果及世界冠军杯安排公告",
      "活力夏日活动周 王者峡谷好礼多",
      "王者大陆的端午宝藏活动公告",
      "峡谷庆端午 惊喜礼不断",
      "【场里场外，一起开黑】感恩礼包放送",
      "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！",
      "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】",
      "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？",
      "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】",
      "KRKPL：还在用庄周打辅助？JY边路庄周带你越塔莽！",
      "世冠KPL赛区战队出征名单公布 王者，无惧挑战！"
    ];
    // 为每个新闻随机添加2个分类
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randomCats.slice(0, 2),
        title: title
      };
    });
    await Article.deleteMany();
    await Article.insertMany(newsList);
    res.send(newsList);
  });

  app.use("/web/api", router);
};
