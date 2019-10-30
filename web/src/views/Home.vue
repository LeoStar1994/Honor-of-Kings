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
    <m-list-card icon="Menu"
                 title="新闻咨询"
                 :cardNavCategories="cardNavCategories">
      <template #items='{category}'>
        <ul>
          <li class="py-2 d-flex fz-14"
              v-for="(item, index) in category.newsList"
              :key="index">
            <span>[{{item.categoryName}}]</span>
            <span class="mx-1">|</span>
            <span class="text-ellipsis flex-1">{{item.title}}</span>
            <time class="text-right text-gray fz-12">{{item.date}}</time>
          </li>
        </ul>
      </template>
    </m-list-card>

    <m-list-card icon='hero'
                 title="英雄列表"
                 :cardNavCategories="[]">
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
      // cardNavCategories data
      cardNavCategories: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "【已开服】8月15日正式服“五虎上将”版本更新公告",
            date: "08/16"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "新闻",
            title: "8.18王者无限开放计划交流会预告",
            date: "08/16"
          }))
        },
        {
          name: "公告",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "安卓更新相关问题指引",
            date: "08/16"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "活动",
            title: "【预告】决战世冠拿专属回城",
            date: "08/16"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "赛事",
            title: "赛程过半，城市赛省赛高光时刻齐回顾！",
            date: "08/16"
          }))
        }
      ]
    };
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
</style>