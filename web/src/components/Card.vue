<!-- Card -->
<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont fz-12 fw-700 pr-2"
         :class="`icon-${icon}`"></i>
      <h3 class="flex-1">{{title}}</h3>
      <i class="iconfont icon-more fz-22 text-right"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
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
    }
  }
};
</script>
<style lang='scss'>
</style>