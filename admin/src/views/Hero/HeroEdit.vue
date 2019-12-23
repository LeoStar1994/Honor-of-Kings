<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-tabs type="border-card"
               value="basic">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息"
                     name="basic">
          <!-- 名称 -->
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <!-- 称号 -->
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <!-- 头像 -->
          <el-form-item label="头像">
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="getAuthHeaders()"
                       :show-file-list="false"
                       :on-success="res => this.$set(model, 'avatar', res.url)"
                       :before-upload="beforeAvatarUpload">
              <img v-if="model.avatar"
                   :src="model.avatar"
                   class="avatar" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 背景图 -->
          <el-form-item label="背景图">
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="getAuthHeaders()"
                       :show-file-list="false"
                       :on-success="res => this.$set(model, 'banner', res.url)"
                       :before-upload="beforeAvatarUpload">
              <img v-if="model.banner"
                   :src="model.banner"
                   class="avatar" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 英雄类型 -->
          <el-form-item label="英雄类型">
            <el-select multiple
                       v-model="model.categories">
              <el-option v-for="item in categories"
                         :key="item._id"
                         :value="item._id"
                         :label="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 评分 -->
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.difficult">
            </el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.skills">
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.attack">
            </el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.survive">
            </el-rate>
          </el-form-item>

          <!-- 召唤师技能 -->
          <el-form-item label="召唤师技能">
            <el-select multiple
                       filterable
                       clearable
                       :multiple-limit="2"
                       v-model="model.summonerSkills">
              <el-option v-for="item in summonerSkillsData"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 铭文 -->
          <el-form-item label="铭文">
            <el-select multiple
                       filterable
                       clearable
                       :multiple-limit="3"
                       v-model="model.inscriptions">
              <el-option v-for="item in inscriptionsData"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 顺风出装 -->
          <el-form-item label="顺风出装">
            <el-select multiple
                       filterable
                       clearable
                       v-model="model.items1">
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 顺风出装tips -->
          <el-form-item label="顺风出装tips">
            <el-input type="textarea"
                      resize="none"
                      placeholder="请输入顺风出装tips"
                      v-model="model.items1Tips">
            </el-input>
          </el-form-item>

          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select multiple
                       filterable
                       clearable
                       v-model="model.items2">
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装tips -->
          <el-form-item label="逆风出装tips">
            <el-input type="textarea"
                      resize="none"
                      placeholder="请输入逆风出装tips"
                      v-model="model.items2Tips">
            </el-input>
          </el-form-item>

          <!-- 使用技巧 -->
          <el-form-item label="使用技巧">
            <el-input type="textarea"
                      resize="none"
                      placeholder="请输入使用技巧"
                      v-model="model.usageTips">
            </el-input>
          </el-form-item>
          <!-- 对抗技巧 -->
          <el-form-item label="对抗技巧">
            <el-input type="textarea"
                      resize="none"
                      placeholder="请输入对抗技巧"
                      v-model="model.battleTips">
            </el-input>
          </el-form-item>
          <!-- 团队技巧 -->
          <el-form-item label="团队技巧">
            <el-input type="textarea"
                      resize="none"
                      placeholder="请输入团队技巧"
                      v-model="model.teamTips">
            </el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 技能 -->
        <el-tab-pane label="技能"
                     name="skills">
          <el-button type="primary"
                     size="small"
                     @click="model.skills.push({})"
                     style="margin-bottom: 20px;">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex"
                  style="flex-wrap: wrap">
            <el-col :md="12"
                    v-for="(item, index) in model.skills"
                    :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"
                          placeholder="请输入技能名称">
                </el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader"
                           :action="uploadUrl"
                           :headers="getAuthHeaders()"
                           :show-file-list="false"
                           :on-success="res => $set(item, 'icon', res.url)"
                           :before-upload="beforeAvatarUpload"
                           accept="image/*">
                  <img v-if="item.icon"
                       :src="item.icon"
                       class="avatar" />
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"
                          resize="none"
                          placeholder="请输入技能冷却值">
                </el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"
                          resize="none"
                          placeholder="请输入技能消耗">
                </el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"
                          resize="none"
                          placeholder="请输入技能描述">
                </el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"
                          type="textarea"
                          resize="none"
                          placeholder="请输入提示语">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger"
                           size="small"
                           @click="() => model.skills.splice(index, 1)">删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 最佳搭档 -->
        <el-tab-pane label="最佳搭档"
                     name="partners">
          <el-button type="primary"
                     size="small"
                     @click="model.partners.push({})"
                     style="margin-bottom: 20px;">
            <i class="el-icon-plus"></i>添加搭档
          </el-button>
          <el-row type="flex"
                  style="flex-wrap: wrap">
            <el-col :md="12"
                    v-for="(item, index) in model.partners"
                    :key="index">
              <el-form-item label="名称">
                <el-select v-model="item.hero"
                           placeholder="请选择"
                           filterable
                           clearable>
                  <el-option v-for="item in heroesData"
                             :key="item.name"
                             :label="item.name"
                             :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"
                          resize="none"
                          placeholder="请输入英雄描述">
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger"
                           size="small"
                           @click="() => model.skills.partners(index, 1)">删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 被谁克制 -->
        <el-tab-pane label="被谁克制"
                     name="foes">
          <el-button type="primary"
                     size="small"
                     @click="model.foes.push({})"
                     style="margin-bottom: 20px;">
            <i class="el-icon-plus"></i>添加敌人
          </el-button>
          <el-row type="flex"
                  style="flex-wrap: wrap">
            <el-col :md="12"
                    v-for="(item, index) in model.foes"
                    :key="index">
              <el-form-item label="名称">
                <el-select v-model="item.hero"
                           placeholder="请选择"
                           filterable
                           clearable>
                  <el-option v-for="item in heroesData"
                             :key="item.name"
                             :label="item.name"
                             :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"
                          resize="none"
                          placeholder="请输入英雄描述">
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger"
                           size="small"
                           @click="() => model.foes.splice(index, 1)">删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 克制谁 -->
        <el-tab-pane label="克制谁"
                     name="restrains">
          <el-button type="primary"
                     size="small"
                     @click="model.restrains.push({})"
                     style="margin-bottom: 20px;">
            <i class="el-icon-plus"></i>添加克制英雄
          </el-button>
          <el-row type="flex"
                  style="flex-wrap: wrap">
            <el-col :md="12"
                    v-for="(item, index) in model.restrains"
                    :key="index">
              <el-form-item label="名称">
                <el-select v-model="item.hero"
                           placeholder="请选择"
                           filterable
                           clearable>
                  <el-option v-for="item in heroesData"
                             :key="item.name"
                             :label="item.name"
                             :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"
                          resize="none"
                          placeholder="请输入英雄描述">
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger"
                           size="small"
                           @click="() => model.restrains.splice(index, 1)">删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary"
                   native-type="submit"
                   style="margin-top: 10px">保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      categories: [], // 英雄分类数据
      items: [], // 装备数据
      summonerSkillsData: [], // 召唤师技能数据
      inscriptionsData: [], //铭文数据
      heroesData: [],
      model: {
        name: "",
        title: "",
        avatar: "",
        banner: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: [], // 技能
        partners: [], // 最佳搭档
        foes: [], // 被谁克制
        restrain: [], //克制谁
        items1: [], // 顺风出装
        items2: [], // 逆风出装
        summonerSkills: [], // 召唤师技能
        inscriptions: [], // 铭文
        usageTips: "",
        battleTips: "",
        teamTips: ""
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 编辑更新分类
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        // 新增分类
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    // 请求分类数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 请求装备数据
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    // 请求召唤师技能数据
    async fetchSummonerSkills() {
      const res = await this.$http.get(`rest/skills`);
      this.summonerSkillsData = res.data;
    },
    // 请求铭文数据
    async fetchInscriptions() {
      const res = await this.$http.get(`rest/inscriptions`);
      this.inscriptionsData = res.data;
    },
    //请求英雄数据
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroesData = res.data;
    },
    // 反显图片
    handleAvatarSuccess(res) {
      this.model.avatar = res.url;
    },
    // 校验上传图片大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },

  created() {
    this.fetchCategories();
    this.fetchItems();
    this.fetchSummonerSkills();
    this.fetchInscriptions();
    this.fetchHeroes();
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>
