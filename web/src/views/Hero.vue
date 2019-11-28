<template>
  <div class="page-hero"
       v-if="model">
    <!-- topbar顶部栏 -->
    <div class="topbar bg-black px-4 py-2 d-flex ai-center fz-10 text-white">
      <img src="../assets/logo.png"
           height="30" />
      <div class="flex-1 px-2 ">
        <span class="ml-1">王者荣耀</span>
        <span class="ml-3">攻略站</span>
      </div>
      <router-link tag="div"
                   to="/"
                   class="text-white">
        更多英雄 <em class="fz-14 fw-700">&gt;</em>
      </router-link>
    </div>
    <!-- 英雄简介 -->
    <div class="top"
         :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white h-100 d-flex flex-column jc-end p-3">
        <span class="fz-12">{{model.title}}</span>
        <h3 class="fw-700 fz-16 my-1">{{model.name}}</h3>
        <span>{{model.categories.map(v => v.name).join('/')}}</span>
        <div class="d-flex pt-2 jc-between">
          <!-- scores -->
          <div class="d-flex scores ai-center fz-12"
               v-if="model.scores">
            <span>难度</span><span class="badge bg-brown mx-2"><em>{{model.scores.difficult}}</em></span>
            <span>技能</span><span class="badge bg-blue-1 mx-2"><em>{{model.scores.skills}}</em></span>
            <span>攻击</span><span class="badge bg-danger mx-2"><em>{{model.scores.attack}}</em></span>
            <span>生存</span><span class="badge bg-black-1 mx-2"><em>{{model.scores.survive}}</em></span>
          </div>
          <!-- skin -->
          <router-link to="/"
                       tag="span"
                       class="text-gray fz-12">
            皮肤：7 <i class="iconfont icon-next fz-8"></i>
          </router-link>
        </div>
      </div>
    </div>
    <!-- content -->
    <div>
      <div class="bg-white px-3">
        <div class="d-flex border-bottom jc-around pt-3 pb-2">
          <div class="nav-item cur">英雄初识</div>
          <div class="nav-item">进阶攻略</div>
        </div>
      </div>
      <swiper>
        <!-- 英雄初识 -->
        <swiper-slide>
          <div class="bg-white p-3 border-bottom">
            <div class="d-flex">
              <router-link tag="button"
                           to="/"
                           class="btn btn-lg flex-1">
                <i class="iconfont icon-video fz-20 mr-1"></i>
                英雄介绍视频
              </router-link>
              <router-link tag="button"
                           to="/"
                           class="btn btn-lg flex-1 ml-2">
                <i class="iconfont icon-tuwen fz-16"></i>
                一图识英雄
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <!-- 进阶攻略 -->
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: null
    };
  },
  created() {
    this.fetchHeroData();
  },
  methods: {
    async fetchHeroData() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-hero {
  .top {
    height: 51vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
    .info {
      background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 1));
      .scores {
        .badge {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          text-align: center;
          vertical-align: center;
          em {
            display: inline-block;
            transform: scale(0.66);
          }
        }
      }
    }
  }
}
</style>