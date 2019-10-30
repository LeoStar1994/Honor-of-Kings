<template>
  <div class='main-page'>
    <!-- 顶部栏 -->
    <div class="topbar bg-black px-4 py-2 d-flex ai-center">
      <img src="../assets/logo.png"
           height="30">
      <div class="flex-1 px-2">
        <p class="text-white">王者荣耀</p>
        <span class="fz-8 text-gray-1">团队成就更多</span>
      </div>
      <button type="button"
              class="btn bg-primary">立即下载</button>
    </div>

    <!-- nav导航 -->
    <nav class="bg-primary pt-3 pb-2">
      <ul class="d-flex text-white jc-around pb-1">
        <router-link :class="['nav-link', {'active': navLinkIndex === index}]"
                     v-for="(item, index) in navLinks"
                     :key="index"
                     tag="li"
                     :to="item.url"
                     @click.native="() => navLinkIndex = index">
          {{item.linkName}}
        </router-link>
      </ul>
    </nav>

    <!-- 路由容器 -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        { url: "/", linkName: "首页" },
        { url: "/", linkName: "攻略中心" },
        { url: "/", linkName: "赛事中心" }
      ],
      navLinkIndex: 0
    };
  }
};
</script>

<style lang='scss' scoped>
.main-page {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .nav-link {
    border-bottom: 3px solid transparent;
    padding-bottom: 0.2rem;
    &.active {
      border-bottom: 3px solid #fff;
    }
  }
}
</style>