<template>
  <div class="home-page">
    <!--  swiper -->
    <swiper :options="swiperOption"
            ref="mySwiper">
      <swiper-slide v-for="(slide, index) in swiperSlides"
                    :key="index">
        <img :src="slide.imgUrl"
             class="w-100">
      </swiper-slide>
      <div class="home-pagination text-right px-3 pb-1 pos-absolute"
           style="z-index: 99;"
           slot="pagination">
      </div>
    </swiper>

    <!-- nav-icons -->
    <div class="nav-icons bg-white text-center mt-3 pt-3">
      <ul class="d-flex flex-wrap">
        <li class="icon-item mb-3 pb-4 pos-relative"
            v-for="(item, index) in spriteItems"
            :key="index">
          <i :class="['sprite',`${item.sprite}`]"></i>
          <p class="pos-absolute w-100 fz-12">{{item.name}}</p>
        </li>
      </ul>
      <div class="bg-light fz-12 py-2">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- card -->
    <m-list-card icon="menu"
                 title="新闻资讯"
                 :categories="newsCategories">
      <template #items='{category}'>
        <ul>
          <router-link tag="li"
                       :to="`/articles/${item._id}`"
                       class="py-2 d-flex fz-14"
                       v-for="(item, index) in category.newsList"
                       :key="index">
            <span class="text-gray">[{{item.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="text-ellipsis flex-1 text-dark-1 pr-3">{{item.title}}</span>
            <time class="text-right text-gray-1 fz-12">{{item.createdAt | date}}</time>
          </router-link>
        </ul>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
    <m-list-card icon='hero'
                 title="英雄列表"
                 :categories="heroCategories">
      <template #items='{category}'>
        <ol class="d-flex flex-wrap"
            style="margin: 0 -0.5rem">
          <router-link tag="li"
                       :to="`/heroes/${hero._id}`"
                       class="p-2 text-center"
                       style="width: 20%"
                       v-for="(hero, index) in category.heroList"
                       :key="index">
            <img :src="hero.avatar"
                 alt=""
                 class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </ol>
      </template>
    </m-list-card>
    <!-- 精彩视频 -->
    <m-list-card icon='video'
                 title="精彩视频"
                 :categories="videoCategories">
      <template #items='{category}'>
        <ul class="d-flex flex-wrap">
          <li style="width:50%"
              class="video-li mb-4"
              v-for="(video, index) in category.videoList"
              :key="index">
            <a :href="video.playUrl"
               target="_blank"
               :title="video.title">
              <img :src="video.banner"
                   alt="">
              <p class="mt-2">{{video.title}}</p>
            </a>
            <div class="d-flex text-gray fz-12 mt-1 pr-2 ai-center">
              <div class="flex-1">
                <i class="iconfont icon-video"></i>
                {{video.viewCounts}}
              </div>
              <span style="30px">{{video.time}}</span>
            </div>
          </li>
        </ul>
      </template>
    </m-list-card>
  </div>

</template>

<script>
import mListCard from "../components/CardList";
export default {
  name: "home-page",
  components: {
    mListCard
  },
  data() {
    return {
      swiperOption: {
        // 分页器小圆点
        pagination: {
          el: ".home-pagination",
          clickable: true
        },
        // 循环
        loop: true,
        // 自动播放设置
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      currentIndex: 0,
      // swipers data
      swiperSlides: [
        {
          imgUrl: require("../assets/images/banner/banner_1.jpeg")
        },
        {
          imgUrl: require("../assets/images/banner/banner_2.jpeg")
        },
        {
          imgUrl: require("../assets/images/banner/banner_3.jpeg")
        }
      ],
      // icons data
      spriteItems: [
        {
          name: "爆料站",
          sprite: "sprite-news"
        },
        {
          name: "故事站",
          sprite: "sprite-story"
        },
        {
          name: "周边商城",
          sprite: "sprite-store"
        },
        {
          name: "体验服",
          sprite: "sprite-experience"
        },
        {
          name: "新人专区",
          sprite: "sprite-new"
        },
        {
          name: "荣耀·传承",
          sprite: "sprite-glory"
        },
        {
          name: "同人社区",
          sprite: "sprite-community"
        },
        {
          name: "王者营地",
          sprite: "sprite-campsite"
        },
        {
          name: "公众号",
          sprite: "sprite-wechat"
        },
        {
          name: "版本介绍",
          sprite: "sprite-version"
        }
      ],
      // 新闻
      newsCategories: [],
      // 英雄
      heroCategories: [],
      // 视频
      videoCategories: []
    };
  },
  methods: {
    async fetchNewsCategories() {
      const res = await this.$http.get("news/list");
      this.newsCategories = res.data;
    },
    async fetchHeroCategories() {
      const res = await this.$http.get("heroes/list");
      this.heroCategories = res.data;
    },
    async fetchVideoCategories() {
      const res = await this.$http.get("videos/list");
      this.videoCategories = res.data;
    }
  },
  created() {
    this.fetchNewsCategories();
    this.fetchHeroCategories();
    this.fetchVideoCategories();
  }
};
</script>

<style lang="scss">
// 引入样式变量
@import "../assets/scss/variables";

.home-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    /* map-get 获取设置变量的值 */
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .icon-item {
    width: 25%;
    position: relative;
    color: #222;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
    p {
      bottom: 0;
    }
  }
}

.video-li {
  a {
    color: #000;
    &:visited {
      color: #999;
    }
    p {
      line-height: 1.5em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    img {
      width: 98%;
      height: 7.307rem;
    }
  }
}
</style>