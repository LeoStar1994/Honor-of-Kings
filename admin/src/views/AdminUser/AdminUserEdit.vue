<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async save() {
      if (!this.model.username || !this.model.password) {
        this.$message.warning("必填项已经输入完毕才可保存");
        return;
      }
      let res;
      if (this.id) {
        // 编辑管理员
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        // 新增分类
        res = await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>
