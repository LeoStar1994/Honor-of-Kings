<template>
  <m-card :title="title"
          :icon="icon">
    <ol class="d-flex jc-between">
      <li class="nav-item"
          :class="{'cur': currentIndex === index}"
          v-for="(item, index) in cardNavCategories"
          :key="index"
          @click="() => currentIndex = index">
        <div class="nav-link">{{item.name}}</div>
      </li>
    </ol>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(category, index) in cardNavCategories"
                      :key="index">
          <slot name="items"
                :category='category'>
          </slot>
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
    cardNavCategories: {
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