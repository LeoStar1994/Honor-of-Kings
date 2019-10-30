<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <!-- 名称 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"
                  placeholder="请输入名称">
        </el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary"
                   size="small"
                   @click="model.items.push({})"
                   style="margin-bottom: 20px;">
          <i class="el-icon-plus"></i>添加广告
        </el-button>

        <el-row type="flex"
                style="flex-wrap: wrap">
          <el-col :md="12"
                  v-for="(item, index) in model.items"
                  :key="index">
            <el-form-item label="跳转链接(url)">
              <el-input v-model="item.url"
                        placeholder="请输入跳转链接"
                        style="margin-top: 1rem;">
              </el-input>
            </el-form-item>
            <el-form-item label="图片"
                          style="margin-top: 1rem;">
              <el-upload class="avatar-uploader"
                         :action="uploadUrl"
                         :headers="getAuthHeaders()"
                         :show-file-list="false"
                         :on-success="res => $set(item, 'image', res.url)"
                         accept="image/*">
                <img v-if="item.image"
                     :src="item.image"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item style="padding-left: 120px;">
              <el-button type="danger"
                         size="small"
                         @click="() => model.items.splice(index, 1)">删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        items: [],
        name: ""
      }
    };
  },
  methods: {
    async save() {
      if (!this.model.items.length) {
        this.$message.warning("请先添加广告再保存");
        return;
      } else if (!this.model.name) {
        this.$message.warning("请先输入分类名称再保存");
        return;
      }
      let res;
      if (this.id) {
        // 编辑更新分类
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 新增分类
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 编辑页面反显分类数据
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    // id存在时才请求数据
    this.id && this.fetch();
  }
};
</script>

<style>
</style>
