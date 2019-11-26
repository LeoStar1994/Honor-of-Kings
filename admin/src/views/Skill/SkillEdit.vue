<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}召唤师技能</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">

      <!-- 名称 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <!-- 图标 -->
      <el-form-item label="图标">
        <el-upload class="avatar-uploader"
                   :action="uploadUrl"
                   :headers="getAuthHeaders()"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="model.icon"
               :src="model.icon"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    };
  },
  methods: {
    async save() {
      if (!this.model.name) {
        this.$message.warning("请先输入召唤师技能名称再保存");
        return;
      } else if (!this.model.icon) {
        this.$message.warning("请先上传召唤师技能图标再保存");
        return;
      }
      let res;
      if (this.id) {
        // 编辑更新分类
        res = await this.$http.put(`rest/skills/${this.id}`, this.model);
      } else {
        // 新增分类
        res = await this.$http.post("rest/skills", this.model);
      }
      this.$router.push("/skills/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/skills/${this.id}`);
      this.model = res.data;
    },
    // 反显图片
    handleAvatarSuccess(res) {
      this.$set(this.model, "icon", res.url);
    },
    // 校验上传图片大小
    beforeAvatarUpload(file) {
      const isPic = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPic) {
        this.$message.error("上传铭文图片只能是JPG|PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传铭文图片大小不能超过 2MB!");
      }
      return isPic && isLt2M;
    }
  },

  created() {
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>
