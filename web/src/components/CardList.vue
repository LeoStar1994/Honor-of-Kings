<template>
  <m-card :title="title"
          :icon="icon">
    <ol class="d-flex jc-between">
      <li class="nav-item"
          :class="{'cur': currentIndex === index}"
          v-for="(item, index) in categories"
          :key="index"
          @click="$refs.list.swiper.slideTo(index)">
        <div class="nav-link">{{item.name}}</div>
      </li>
    </ol>
    <div class="pt-3">
      <swiper ref="list" 
              @slide-change="currentIndex = $refs.list.swiper.realIndex"
              :options="{autoHeight: true}">
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <!-- 将category数据通过插槽传递出去 -->
          <slot name="items" :category='category'></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true,
      defaults: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  }
};
</script>
<style lang='scss'>
@import "../assets/scss/variables";
.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  .card-body {
    .nav-item {
      &.cur {
        color: map-get($map: $colors, $key: "primary");
        border-bottom: 2px solid map-get($map: $colors, $key: "primary");
      }
    }
  }
}
</style>