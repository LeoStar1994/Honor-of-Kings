import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/articles/:id",
          name: "article",
          component: () => import("./views/Article.vue"),
          props: true
        }
      ]
    },
    {
      path: "/heroes/:id",
      name: "heroes",
      component: () => import("./views/Hero.vue"),
      props: true
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

export default router;
