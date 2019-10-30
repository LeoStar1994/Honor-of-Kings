<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <!-- 所属分类 -->
      <el-form-item label="所属分类">
        <el-select v-model="model.categories"
                   multiple>
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
      <!-- 摘要 -->
      <el-form-item label="摘要">
        <vue-editor v-model="model.body"
                    useCustomImageHandler
                    @imageAdded="handleImageAdded">
        </vue-editor>
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
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: { type: String }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        categories: "",
        title: "",
        body: ""
      },
      categories: []
    };
  },
  methods: {
    async save() {
      if (!this.model.categories || !this.model.title || !this.model.body) {
        this.$message.warning("请检查必填项是已填");
        return;
      }
      let res;
      if (this.id) {
        // 编辑更新文章
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 新增文章
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 查询所有分类数据
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    // 富文本编辑器添加上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      // 往表单数据中追加file 需要与upload.single的文件字段名一致
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },

  created() {
    this.fetchCategories();
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>


