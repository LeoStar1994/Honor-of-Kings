<template>
  <div class="login">
    <el-card header="请先登录"
             class="login-card">
      <el-form ref="form"
               :model="model"
               label-width="80px"
               @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"
                    type="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     native-type="submit">登录
          </el-button>
          <el-button type="primary"
                     size="medium"
                     @click="resetLogin">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      /* if (res.data.code === 422) {
        this.$message({
          type: "error",
          message: res.data.message
        });
      } else {
        sessionStorage.token = res.data.token;
        this.$message({
          type: "success",
          message: "登录成功"
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } */
      sessionStorage.token = res.data.token;
      this.$message({
        type: "success",
        message: "登录成功"
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
    resetLogin() {
      this.model.username = "";
      this.model.password = "";
    }
  }
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>