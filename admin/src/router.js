import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { isPublic: true },
      component: () => import("./views/Login.vue")
    },
    {
      path: "/",
      name: "main",
      component: () => import("./views/Main.vue"),
      children: [
        /* 分类 */
        {
          path: "/categories/create",
          name: "categoriesCreate",
          component: () => import("./views/Category/CategoryEdit.vue")
        },
        {
          // 新建与编辑共用一个组件
          path: "/categories/edit/:id",
          name: "categoriesEdit",
          component: () => import("./views/Category/CategoryEdit.vue"),
          // 是否把parmas注册到props
          props: true
        },
        {
          path: "/categories/list",
          name: "categoriesList",
          component: () => import("./views/Category/CategoryList.vue")
        },
        /* 物品 */
        {
          path: "/items/create",
          name: "itemsCreate",
          component: () => import("./views/Item/ItemEdit.vue")
        },
        {
          path: "/items/edit/:id",
          name: "itemsEdit",
          component: () => import("./views/Item/ItemEdit.vue"),
          props: true
        },
        {
          path: "/items/list",
          name: "itemsList",
          component: () => import("./views/Item/ItemList.vue")
        },
        /* 铭文 */
        {
          path: "/inscriptions/create",
          name: "inscriptionCreate",
          component: () => import("./views/Inscription/InscriptionEdit.vue")
        },
        {
          path: "/inscriptions/edit/:id",
          name: "inscriptionEdit",
          component: () => import("./views/Inscription/InscriptionEdit.vue"),
          props: true
        },
        {
          path: "/inscriptions/list",
          name: "inscriptionsList",
          component: () => import("./views/Inscription/InscriptionList.vue")
        },
        /* 英雄 */
        {
          path: "/heroes/create",
          name: "heroesCreate",
          component: () => import("./views/Hero/HeroEdit.vue")
        },
        {
          path: "/heroes/edit/:id",
          name: "heroesEdit",
          component: () => import("./views/Hero/HeroEdit.vue"),
          props: true
        },
        {
          path: "/heroes/list",
          name: "heroesList",
          component: () => import("./views/Hero/HeroList.vue")
        },
        /* 召唤师技能 */
        {
          path: "/skills/create",
          name: "skillsCreate",
          component: () => import("./views/Skill/SkillEdit.vue")
        },
        {
          path: "/skills/edit/:id",
          name: "skillsEdit",
          component: () => import("./views/Skill/SkillEdit.vue"),
          props: true
        },
        {
          path: "/skills/list",
          name: "skillsList",
          component: () => import("./views/Skill/SkillList.vue")
        },
        /* 文章 */
        {
          path: "/articles/create",
          name: "articlesCreate",
          component: () => import("./views/Article/ArticleEdit.vue")
        },
        {
          path: "/articles/edit/:id",
          name: "articlesEdit",
          component: () => import("./views/Article/ArticleEdit.vue"),
          props: true
        },
        {
          path: "/articles/list",
          name: "articlesList",
          component: () => import("./views/Article/ArticleList.vue")
        },
        /* 广告 */
        {
          path: "/ads/create",
          name: "adsCreate",
          component: () => import("./views/Ad/AdEdit.vue")
        },
        {
          path: "/ads/edit/:id",
          name: "adsEdit",
          component: () => import("./views/Ad/AdEdit.vue"),
          props: true
        },
        {
          path: "/ads/list",
          name: "adsList",
          component: () => import("./views/Ad/AdList.vue")
        },
        /* 管理员 */
        {
          path: "/admin_users/create",
          name: "admin_usersCreate",
          component: () => import("./views/AdminUser/AdminUserEdit.vue")
        },
        {
          path: "/admin_users/edit/:id",
          name: "admin_usersEdit",
          component: () => import("./views/AdminUser/AdminUserEdit.vue"),
          props: true
        },
        {
          path: "/admin_users/list",
          name: "admin_usersList",
          component: () => import("./views/AdminUser/AdminUserList.vue")
        }
      ]
    }
  ]
});

// 路由守卫
/* router.beforeEach((to, from, next) => {
  const token = sessionStorage.token;
  if (token) {
    if (to.path !== from.path) {
      NProgress.start();
    }
    next();
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
}); */

router.beforeEach((to, from, next) => {
  const token = sessionStorage.token;
  // 如果不是公共允许访问的login页面 且 token不存在时, => 跳转到登录页
  if (!to.meta.isPublic && !token) {
    next("/login");
  } else {
    if (to.path !== from.path) {
      NProgress.start();
    }
    next();
  }
});

router.afterEach(() => {
  // 关闭进度条提示
  NProgress.done();
});

export default router;
