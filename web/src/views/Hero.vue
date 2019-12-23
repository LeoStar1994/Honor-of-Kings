<template>
  <div class="page-hero" v-if="model">
    <!-- topbar顶部栏 -->
    <div class="topbar bg-black px-4 py-2 d-flex ai-center fz-10 text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="flex-1 px-2 ">
        <span class="ml-1">王者荣耀</span>
        <span class="ml-3">攻略站</span>
      </div>
      <router-link tag="div" to="/" class="text-white">
        更多英雄 <em class="fz-14 fw-700">&gt;</em>
      </router-link>
    </div>
    <!-- 英雄简介 -->
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white h-100 d-flex flex-column jc-end p-3">
        <span class="fz-12">{{ model.title }}</span>
        <h3 class="fw-700 fz-16 my-1">{{ model.name }}</h3>
        <span>{{ model.categories.map(v => v.name).join("/") }}</span>
        <div class="d-flex pt-2 jc-between">
          <!-- scores -->
          <div class="d-flex scores ai-center fz-12" v-if="model.scores">
            <span>难度</span
            ><span class="badge bg-brown mx-2"
              ><em>{{ model.scores.difficult }}</em></span
            >
            <span>技能</span
            ><span class="badge bg-blue-1 mx-2"
              ><em>{{ model.scores.skills }}</em></span
            >
            <span>攻击</span
            ><span class="badge bg-danger mx-2"
              ><em>{{ model.scores.attack }}</em></span
            >
            <span>生存</span
            ><span class="badge bg-black-1 mx-2"
              ><em>{{ model.scores.survive }}</em></span
            >
          </div>
          <!-- skin -->
          <router-link to="/" tag="span" class="text-gray fz-12">
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
          <div class="bg-drak-1">
            <div class="bg-white p-3 border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-video fz-22"></i>
                  <span>英雄介绍视频</span>
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-tuwen fz-18"></i>
                  <span class="ml-2">一图识英雄</span>
                </router-link>
              </div>
              <!-- skills -->
              <div class="skill d-flex pt-5 pb-5 jc-around">
                <img
                  :src="item.icon"
                  v-for="(item, index) in model.skills"
                  :class="{ active: currentSkillIndex === index }"
                  @click="currentSkillIndex = index"
                  :key="index"
                  alt=""
                />
              </div>
              <div v-if="currentSkill">
                <div class="title d-flex mt-2 mb-5">
                  <h3 class="fw-700 mr-5">{{ currentSkill.name }}</h3>
                  <span class="fz-12 text-gray"
                    >(冷却值：{{ currentSkill.delay }} 消耗：
                    {{ currentSkill.cost }})</span
                  >
                </div>
                <p style="line-height: 1.6em;">
                  {{ currentSkill.description }}
                </p>
                <div class="border-bottom mt-2 mb-3"></div>
                <p class="text-gray-1 pb-2" style="line-height: 1.6em;">
                  小提示：{{ currentSkill.tips }}
                </p>
              </div>
            </div>

            <!-- 加点建议 -->
            <m-card title="加点建议" icon="yuanquan" plain>
              <div class="d-flex punctuate">
                <ul class="d-flex flex-1 text-center">
                  <li
                    v-for="(item, index) in model.skills.slice(1, 3)"
                    :key="index"
                  >
                    <p class="fz-16">{{ index === 0 ? "主升" : "副升" }}</p>
                    <img :src="item.icon" alt="" class="mt-3 mb-2" />
                    <span class="fz-12">{{ item.name }}</span>
                  </li>
                </ul>
                <div class="flex-1 text-center summonerSkill">
                  <p class="fz-16">召唤师技能</p>
                  <ol class="d-flex">
                    <li v-for="item in model.summonerSkills" :key="item.name">
                      <img :src="item.icon" alt="" class="mt-3 mb-2" />
                      <span class="fz-12">{{ item.name }}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </m-card>
            <!-- 出装推荐 -->
            <m-card title="出装推荐" icon="yuanquan" plain>
              <!-- 顺风出装 -->
              <div class="downwind pb-4 border-bottom">
                <h3>顺风出装</h3>
                <ul class="d-flex jc-around">
                  <li v-for="item in model.items1" :key="item.name">
                    <img :src="item.icon" alt="" />
                    <span class="fz-12">{{ item.name }}</span>
                  </li>
                </ul>
                <p>{{ model.items1Tips }}</p>
              </div>
              <!-- 逆风出装 -->
              <div class="downwind pb-4 pt-3">
                <h3>逆风出装</h3>
                <ul class="d-flex jc-around">
                  <li v-for="item in model.items2" :key="item.name">
                    <img :src="item.icon" alt="" />
                    <span class="fz-12">{{ item.name }}</span>
                  </li>
                </ul>
                <p>{{ model.items2Tips }}</p>
              </div>
            </m-card>
            <!-- 铭文推荐 -->
            <m-card title="铭文推荐" icon="yuanquan" plain>
              <div class="d-flex inscription">
                <div
                  class="flex-1"
                  v-for="item in model.inscriptions"
                  :key="item.name"
                >
                  <img :src="item.icon" alt="" />
                  <p class="fz-16">{{ item.name }}</p>
                  <p>{{ item.effect1 }}</p>
                  <p>{{ item.effect2 }}</p>
                </div>
              </div>
            </m-card>
            <!-- 使用技巧 -->
            <m-card title="使用技巧" icon="yuanquan" plain class="common">
              {{ model.usageTips }}
            </m-card>
            <!-- 对抗技巧 -->
            <m-card title="对抗技巧" icon="yuanquan" plain class="common">
              {{ model.battleTips }}
            </m-card>
            <!-- 团战思路 -->
            <m-card title="团战思路" icon="yuanquan" plain class="common">
              {{ model.teamTips }}
            </m-card>
            <!-- 英雄关系 -->
            <m-card
              title="英雄关系"
              icon="yuanquan"
              plain
              class="hero-relation"
            >
              <!-- 最佳搭档 -->
              <div class="partners">
                <h3>最佳搭档</h3>
                <div
                  class="d-flex my-3"
                  v-for="(item, index) in model.partners"
                  :key="index"
                >
                  <img :src="item.hero.avatar" alt="" />
                  <p>{{ item.description }}</p>
                </div>
              </div>
              <div class="border-bottom"></div>
              <!-- 被谁克制 -->
              <div class="foes pt-3">
                <h3>被谁克制</h3>
                <div
                  class="d-flex my-3"
                  v-for="(item, index) in model.foes"
                  :key="index"
                >
                  <img :src="item.hero.avatar" alt="" />
                  <p>{{ item.description }}</p>
                </div>
              </div>
              <div class="border-bottom"></div>
              <!-- 克制谁 -->
              <div class="restrains pt-3">
                <h3>克制谁</h3>
                <div
                  class="d-flex my-3"
                  v-for="(item, index) in model.restrains"
                  :key="index"
                >
                  <img :src="item.hero.avatar" height="48px" alt="" />
                  <p>{{ item.description }}</p>
                </div>
              </div>
              <div class="border-bottom"></div>
            </m-card>
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
      model: null,
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
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
@import "../assets/scss/_variables";
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
  .skill {
    img {
      width: 5rem;
      height: 5rem;
      display: block;
      border-radius: 45%;
      border: 3px solid transparent;
      &.active {
        border-color: map-get($map: $colors, $key: "primary");
      }
    }
  }
  .punctuate {
    ul {
      li {
        &:first-child {
          padding-left: 5px;
          margin-right: 35px;
        }
      }
    }
    img {
      width: 4.6154rem;
      height: 4.6154rem;
      display: block;
      border-radius: 50%;
    }
  }
  .summonerSkill {
    padding-left: 3.4615rem;
    ol {
      li {
        &:first-child {
          margin-right: 1rem;
        }
      }
    }
  }
  .downwind {
    ul {
      li {
        text-align: center;
        img {
          display: block;
          width: 46.5px;
          height: 46.5px;
          border-radius: 50%;
          margin: 0.8125rem 0 0.3125rem;
        }
      }
    }
    p {
      margin-top: 1.1538rem;
      line-height: 1.5em;
      color: map-get($map: $colors, $key: "gray");
    }
  }
  .inscription {
    img {
      display: block;
      width: 2.5769rem;
      height: 3.0385rem;
    }
    p {
      line-height: 1.5em;
      padding-left: 1rem;
    }
  }
  .common {
    line-height: 1.5em;
  }
  .hero-relation {
    line-height: 1.6em;
    img {
      display: block;
      width: 3.692rem;
      height: 3.692rem;
      margin-right: 0.769rem;
    }
  }
}
</style>
