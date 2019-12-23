<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}视频</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <!-- 所属分类 -->
      <el-form-item label="所属分类">
        <el-select v-model="model.categories">
          <el-option v-for="item in categories"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 标题 -->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
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
      <!-- 播放量 -->
      <el-form-item label="播放量">
        <el-input v-model="model.viewCounts"></el-input>
      </el-form-item>
      <!-- 链接 -->
      <el-form-item label="链接">
        <el-input v-model="model.playUrl"></el-input>
      </el-form-item>
      <!-- 时间 -->
      <el-form-item label="时间">
        <el-input v-model="model.time"></el-input>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary"
                   native-type="submit">保存
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
      model: {
        categories: "",
        title: "",
        banner: "",
        viewCounts: "",
        playUrl: "",
        time: ""
      },
      categories: []
    };
  },
  methods: {
    // 校验上传图片大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    async save() {
      if (
        !this.model.categories ||
        !this.model.title ||
        !this.model.banner ||
        !this.model.viewCounts ||
        !this.model.playUrl ||
        !this.model.time
      ) {
        this.$message.warning("请检查必填项是已填");
        return;
      }
      let res;
      if (this.id) {
        // 编辑视频
        res = await this.$http.put(`rest/videos/${this.id}`, this.model);
      } else {
        // 新增视频
        res = await this.$http.post("rest/videos", this.model);
      }
      this.$router.push("/videos/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/videos/${this.id}`);
      this.model = res.data;
    },
    // 查询所有分类数据
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    }
  },

  created() {
    this.fetchCategories();
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>


