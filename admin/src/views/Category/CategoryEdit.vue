<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <!-- 上级分类 -->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- 确保父级机构的唯一性 value值使用_id -->
          <el-option v-for="item in parents"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 名称 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (!this.model.name) {
        this.$message.warning("请先输入分类名称再保存");
        return;
      }
      let res;
      if (this.id) {
        // 编辑更新分类
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        // 新增分类
        res = await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    // 查询所有分类数据
    async fetchParents() {
      const res = await this.$http.get("rest/categories");
      this.parents = res.data;
    }
  },

  created() {
    this.fetchParents();
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>
