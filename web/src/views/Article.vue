<template>
  <div class="page-article"
       v-if="model">
    <!-- title -->
    <div class="d-flex px-2 py-3 border-bottom">
      <i class="iconfont icon-back text-blue fz-20"
         @click="$router.go(-1)"></i>
      <strong class="flex-1 pl-2 fw-700 text-blue">{{model.title}}</strong>
      <span class="text-gray fz-10">{{model.createdAt | date('YYYY-MM-DD')}}</span>
    </div>
    <!-- content -->
    <div v-html="model.body"
         class="body p-4 fz-16 lh-16"></div>
    <!-- 相关资讯 -->
    <div class="border-top px-3 py-4">
      <div class="d-flex flex-ai">
        <i class="iconfont icon-fenxiang1 fz-22"></i>
        <strong class="text-blue fz-14 ml-2">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
        class="py-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      model: null
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  watch: {
    id: "fetch" // 等同与id(){}形式
  }
};
</script>

<style lang="scss">
.page-article {
  .body {
    line-height: 1.8em;
    h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>

