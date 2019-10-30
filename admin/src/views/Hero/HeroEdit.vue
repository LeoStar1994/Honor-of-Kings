<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
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
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="model.avater"
                   :src="model.avater"
                   class="avatar">
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

          <!-- 顺风出装 -->
          <el-form-item label="顺风出装">
            <el-select multiple
                       v-model="model.items1">
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select multiple
                       v-model="model.items2">
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
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
                       class="avatar">
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"
                          resize="none"
                          placeholder="请输入技能名称">
                </el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"
                          type="textarea"
                          resize="none"
                          placeholder="请输入技能名称">
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
      categories: [], // 英雄分类
      items: [], // 装备
      model: {
        name: "",
        title: "",
        avater: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: [], // 技能
        items1: [], // 顺风出装
        items2: [], // 逆风出装
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
    // 反显图片
    handleAvatarSuccess(res) {
      this.model.avater = res.url;
    },
    // 校验上传图片大小
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      /* if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      } */
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },

  created() {
    this.fetchCategories();
    this.fetchItems();
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>
