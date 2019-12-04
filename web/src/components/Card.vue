<!-- Card -->
<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center"
         :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <i class="iconfont fz-12 fw-700 pr-2"
         :class="`icon-${icon}`"></i>
      <h3 class="flex-1"
          :class="{'fw-700': plain, 'fz-16': plain}">{{title}}</h3>
      <i class="iconfont icon-more fz-22 text-right"
         v-if="!plain"></i>
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
    },
    plain: {
      type: Boolean
    }
  }
};
</script>
