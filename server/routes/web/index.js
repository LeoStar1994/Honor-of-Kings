module.exports = app => {
  const router = require("express").Router();
  const mongoose = require("mongoose");

  // 通过mongoose获取分类、文章、英雄的model
  const Category = mongoose.model("Category");
  const Article = mongoose.model("Article");
  const Hero = mongoose.model("Hero");
  const Video = mongoose.model("Video");

  // 初始化导入新闻数据
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
      "夏日新版本“稷下星之队”即将12月上线",
      "王者荣耀携手两大博物馆 走进稷下学宫",
      "王者大陆第一学院【稷下】档案",
      "跨界合作丨控油神装登场，唤醒无限护肤力量！",
      "像素游戏时代“老四强”重聚《魂斗罗：归来》，新版本、新英雄燃爆两周年庆",
      "11月11日全服不停机更新公告",
      "【已修复】王者大陆的端午宝藏活动页面异常问题说明",
      "11月7日体验服停机更新公告",
      "11月4日全服不停机更新公告",
      "关于2019年KPL夏季赛总决赛 RNG.M vs eStarPro 补赛、赛果及世界冠军杯安排公告",
      "活力夏日活动周 王者峡谷好礼多",
      "王者大陆的端午宝藏活动公告",
      "峡谷庆端午 惊喜礼不断",
      "【场里场外，一起开黑】感恩礼包放送",
      "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！",
      "【11月15日 再战西安 · 2019年KPL夏季赛总决赛重启公告】",
      "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？",
      "【关于2019年KPL夏季赛总决赛门票退换及异地用户现场观赛补贴公告】",
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
    await Article.deleteMany(); // 清空
    await Article.insertMany(newsList); // 插入数据
    res.send(newsList);
  });

  // 新闻列表接口
  router.get("/news/list", async (req, res) => {
    // 以分类为主体把新闻调出来
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    // 聚合查询 查出新闻分类下的子分类
    const cats = await Category.aggregate([
      //条件筛选关键词，类似mysql中的where
      { $match: { parent: parent._id } },
      // 连表关键词，类似mysql中的left join
      {
        $lookup: {
          from: "articles", //需要连接的表名（小写复数形式）
          localField: "_id", // 本表需要关联的字段（键）
          foreignField: "categories", // 被关联表关联的字段key
          as: "newsList" // 对应的外键集合的数据结果别名
        }
      },
      // 添加字段，从newsList中截取5个数据
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ]);
    // 获取新闻子分类的_id数组
    const subCats = cats.map(v => v._id);
    // 插入热门类
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats } // $in是批量查询，[1,2,3,4,5]这种形式的数组可以直接进行查询
        })
        .populate("categories")
        .limit(5)
        .lean()
    });
    // 为每条数据添加categoryName字段，如果是热门下则显示其原本数据的分类
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });

  // 初始化导入英雄数据
  router.get("/heroes/init", async (req, res) => {
    await Hero.deleteMany({});
    const rowData = [
      {
        name: "热门",
        heroes: [
          {
            name: "后羿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
          },
          {
            name: "孙悟空",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "鲁班七号",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
          },
          {
            name: "亚瑟",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "甄姬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
          },
          {
            name: "孙尚香",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
          },
          {
            name: "典韦",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
          },
          {
            name: "韩信",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
          },
          {
            name: "庄周",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
          }
        ]
      },
      {
        name: "战士",
        heroes: [
          {
            name: "赵云",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
          },
          {
            name: "钟无艳",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
          },
          {
            name: "吕布",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          },
          {
            name: "曹操",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
          },
          {
            name: "典韦",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
          },
          {
            name: "宫本武藏",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
          },
          {
            name: "达摩",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
          },
          {
            name: "老夫子",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
          },
          {
            name: "关羽",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
          },
          {
            name: "露娜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
          },
          {
            name: "花木兰",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
          },
          {
            name: "亚瑟",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "孙悟空",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "刘备",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
          },
          {
            name: "杨戬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
          },
          {
            name: "雅典娜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
          },
          {
            name: "哪吒",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
          },
          {
            name: "铠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "狂铁",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
          },
          {
            name: "李信",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
          },
          {
            name: "盘古",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
          }
        ]
      },
      {
        name: "法师",
        heroes: [
          {
            name: "小乔",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
          },
          {
            name: "墨子",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
          },
          {
            name: "妲己",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
          },
          {
            name: "嬴政",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
          },
          {
            name: "高渐离",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
          },
          {
            name: "扁鹊",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
          },
          {
            name: "芈月",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
          },
          {
            name: "周瑜",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
          },
          {
            name: "甄姬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
          },
          {
            name: "武则天",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
          },
          {
            name: "貂蝉",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
          },
          {
            name: "安琪拉",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
          },
          {
            name: "姜子牙",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
          },
          {
            name: "王昭君",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
          },
          {
            name: "张良",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
          },
          {
            name: "不知火舞",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
          },
          {
            name: "钟馗",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
          },
          {
            name: "诸葛亮",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
          },
          {
            name: "干将莫邪",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
          },
          {
            name: "女娲",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
          },
          {
            name: "杨玉环",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
          },
          {
            name: "弈星",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
          },
          {
            name: "米莱狄",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
          },
          {
            name: "沈梦溪",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
          },
          {
            name: "上官婉儿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
          },
          {
            name: "嫦娥",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          }
        ]
      },
      {
        name: "坦克",
        heroes: [
          {
            name: "廉颇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
          },
          {
            name: "刘禅",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
          },
          {
            name: "白起",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
          },
          {
            name: "夏侯惇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
          },
          {
            name: "项羽",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
          },
          {
            name: "程咬金",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
          },
          {
            name: "刘邦",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
          },
          {
            name: "牛魔",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
          },
          {
            name: "张飞",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
          },
          {
            name: "东皇太一",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
          },
          {
            name: "苏烈",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "梦奇",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
          },
          {
            name: "孙策",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "猪八戒",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
          }
        ]
      },
      {
        name: "刺客",
        heroes: [
          {
            name: "阿轲",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
          },
          {
            name: "李白",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
          },
          {
            name: "韩信",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
          },
          {
            name: "兰陵王",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
          },
          {
            name: "娜可露露",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
          },
          {
            name: "橘右京",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
          },
          {
            name: "百里玄策",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
          },
          {
            name: "裴擒虎",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
          },
          {
            name: "元歌",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
          },
          {
            name: "司马懿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
          },
          {
            name: "云中君",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
          }
        ]
      },
      {
        name: "射手",
        heroes: [
          {
            name: "孙尚香",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
          },
          {
            name: "鲁班七号",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
          },
          {
            name: "马可波罗",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
          },
          {
            name: "狄仁杰",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
          },
          {
            name: "后羿",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
          },
          {
            name: "李元芳",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
          },
          {
            name: "虞姬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
          },
          {
            name: "成吉思汗",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
          },
          {
            name: "黄忠",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
          },
          {
            name: "百里守约",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
          },
          {
            name: "公孙离",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
          },
          {
            name: "伽罗",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
          }
        ]
      },
      {
        name: "辅助",
        heroes: [
          {
            name: "庄周",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
          },
          {
            name: "孙膑",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
          },
          {
            name: "蔡文姬",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
          },
          {
            name: "太乙真人",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
          },
          {
            name: "大乔",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
          },
          {
            name: "鬼谷子",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
          },
          {
            name: "明世隐",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
          },
          {
            name: "盾山",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
          },
          {
            name: "瑶",
            avatar:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
          }
        ]
      }
    ];
    for (let cat of rowData) {
      // 如果英雄类别是热门，跳出继续下轮循环
      if (cat.name === "热门") {
        continue
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      });
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category];
        return hero;
      });
      // 录入英雄
      await Hero.insertMany(cat.heroes);
    }
    res.send(await Hero.find());
  });

  // 英雄列表接口
  router.get("/heroes/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "英雄分类"
    });
    // 获取英雄子分类
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "heroes",
          localField: "_id",
          foreignField: "categories",
          as: "heroList"
        }
      }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      heroList: await Hero.find()
        .where({
          categories: { $in: subCats }
        })
        .limit(10)
        .lean()
    });

    res.send(cats);
  });

  // 初始化导入视频数据
  router.get("/videos/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "视频分类"
    });
    const videoSubCats = await Category.find()
      .where({
        parent: parent
      })
      .lean();
    const videoDatas = [
      {
        title: "【百星王者带你飞】第118期：起舞弄清影 绝世舞姬貂蝉",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=573993&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "575.6万",
        time: "12-06",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20191204/a8f73a12cdddf0f835c47d97c73a52de.1575427262.f75baf40b753a6e14ce1b426627c79d8.230x140_8729.jpg"
      },
      {
        title: "【王者克制论】曹三刀丝血反杀太霸道？李九教你完美克制曹操",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=574314&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "12.7万",
        time: "12-06",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20191205/53873bcaec5c3fe56e9d681410452d30.1575515228.9709ee46fe3e77ce42d027339f038d77.230x140_38347.jpg"
      },
      {
        title: "【峡谷情报局】第91期：最高荣耀战力盘点，鲁班大师套路展示",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=573807&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "436.4万",
        time: "12-03",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20191203/a8f73a12cdddf0f835c47d97c73a52de.1575342538.41b272d8f476a45a1ac4f66f0dcc70e5.230x140_16463.jpg"
      },
      {
        title: "【新天下王者】第5期：机车少年变奶爸 北笙吐露真心话",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=572907&e_code=pvpweb_m.statictypenew.type0",
        viewCounts: "532.2万",
        time: "11-30",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20191128/a8f73a12cdddf0f835c47d97c73a52de.1574938598.5425161c4b6efa623d88455752eb1af7.230x140_10776.jpg"
      },
      {
        title: "猴子和兰陵王遇到神级马可，连续的反杀操作，打得两人没有脾气",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549791&e_code=pvpweb_m.statictypenew.type641",
        viewCounts: "4万",
        time: "09-02",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20190829/0fed9150bb660fe087fc5b81a2b8d50b.1567084750.7a6176cf4229f5978f81c252e59b1c71.230x140_19614.jpg"
      },
      {
        title: "在这个模式玩钟馗，不想成辅助都难哦！",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549402&e_code=pvpweb_m.statictypenew.type675",
        viewCounts: "8798",
        time: "08-31",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20190828/c81e728d9d4c2f636f067f89cc14862c.1566979174.49877d84db3db2e7e7c9dec467347647.230x140_16202.jpg"
      },
      {
        title: "王者荣耀排位日常：功能型法师张良，更偏向于控制，多游走支援！",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550203&e_code=pvpweb_m.statictypenew.type619",
        viewCounts: "2.5万",
        time: "09-02",
        banner:
          "https://itea-cdn.qq.com/file/tgl/20190831/34ba14d7e74b333126620db8148b7a4a.1567236016.96cfd48480b6f569f5deb0869ddd8925.230x140_43156.jpg"
      },
      {
        title: "王者荣耀s16边路上分英雄首选是谁？职业玩家都玩的英雄橘子！",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=539533&e_code=pvpweb_m.statictypenew.type623",
        viewCounts: "1.9万",
        time: "09-09",
        banner: "https://puui.qpic.cn/qqvideo_ori/0/p0904oeyu12_1280_720/0"
      },
      {
        title: "【KPL冬季席位赛】败者组 YSL vs XM 第5局",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=575084&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "1072",
        time: "12-09",
        banner:
          "https://shp.qpic.cn/cfwebcap/0/7f349f95aeb0f4cb3ad66abada6ea115/0/?width=230&height=140"
      },
      {
        title: "【KPL冬季席位赛】败者组 YSL vs XM 第4局",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=575083&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "212",
        time: "12-09",
        banner:
          "https://shp.qpic.cn/cfwebcap/0/a99bfac3e4f78f28fcf96a9e53cdfc6b/0/?width=230&height=140"
      },
      {
        title: "【KPL冬季席位赛】败者组 YSL vs XM 第3局",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=575080&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "232",
        time: "12-09",
        banner:
          "https://shp.qpic.cn/cfwebcap/0/a62ded0bd7c98d1b4b8624117e508023/0/?width=230&height=140"
      },
      {
        title: "【KPL冬季席位赛】败者组 YSL vs XM 第2局",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=575079&e_code=pvpweb_m.statictypenew.type587",
        viewCounts: "201",
        time: "12-09",
        banner:
          "https://shp.qpic.cn/cfwebcap/0/0ca77cc2f07020b0983ea16293cd175c/0/?width=230&height=140"
      },
      {
        title: "王者荣耀世冠：远游之枪华丽收割，花满楼世冠马可波罗击杀集锦",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550567&e_code=pvpweb_m.statictypenew.type751",
        viewCounts: "3.6万",
        time: "09-03",
        banner: "https://puui.qpic.cn/qqvideo_ori/0/z092122i7uv_1280_720/0"
      },
      {
        title: "Djie一闪侧翼进场，梦奇小爪子疯狂乱舞！",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550792&e_code=pvpweb_m.statictypenew.type751",
        viewCounts: "1.5万",
        time: "09-02",
        banner: "https://puui.qpic.cn/qqvideo_ori/0/g0921jhs0ha_1280_720/0"
      },
      {
        title: "花海云中君暴走时刻，这波三杀真的帅气！",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550566&e_code=pvpweb_m.statictypenew.type751",
        viewCounts: "1.5万",
        time: "09-02",
        banner: "https://puui.qpic.cn/qqvideo_ori/0/r09212zlrm4_1280_720/0"
      },
      {
        title: "世冠雨雨关羽集锦：这就是实力！千万雄兵莫敢当，单刀匹马斩四方",
        playUrl:
          "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550251&e_code=pvpweb_m.statictypenew.type751",
        viewCounts: "2.5万",
        time: "09-01",
        banner: "https://puui.qpic.cn/qqvideo_ori/0/b0921yawkou_1280_720/0"
      }
    ];
    videoDatas.forEach((video, i) => {
      if (i < 4) {
        video.categories = videoSubCats[0];
      } else if (i < 8) {
        video.categories = videoSubCats[1];
      } else if (i < 12) {
        video.categories = videoSubCats[2];
      } else {
        video.categories = videoSubCats[3];
      }
    });
    await Video.deleteMany();
    await Video.insertMany(videoDatas);
    res.send(videoDatas);
  });

  // 视频列表接口
  router.get("/videos/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "视频分类"
    });
    // 获取视频子分类
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "categories",
          as: "videoList"
        }
      }
    ]);
    res.send(cats);
  });

  // 获取文章详情接口
  router.get("/articles/:id", async (req, res) => {
    const id = req.params.id;
    // 通过前端传递的文章id找出该篇文章具体内容
    const data = await Article.findById(id).lean();
    // 添加相关资讯数据，同分类下取2条文章列表
    data.related = await Article.find()
      .where({
        categories: { $in: data.categories }
      })
      .limit(2);
    res.send(data);
  });

  // 获取英雄详情数据接口
  router.get("/heroes/:id", async (req, res) => {
    const id = req.params.id;
    const data = await Hero.findById(id)
      .populate(
        "categories items1 items2 summonerSkills inscriptions partners.hero restrains.hero foes.hero"
      )
      .lean();
    res.send(data);
  });

  app.use("/web/api", router);
};
