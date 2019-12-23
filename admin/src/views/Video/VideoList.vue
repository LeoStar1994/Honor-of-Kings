<template>
  <div>
    <h1>视频列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id"
                       label="ID"
                       width="240">
      </el-table-column>

      <el-table-column prop="title"
                       label="视频标题">
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="$router.push(`/videos/edit/${scope.row._id}`)">编辑
          </el-button>
          <el-button type="text"
                     size="small"
                     @click="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    // 请求table列表数据
    async fetch() {
      const res = await this.$http.get("rest/videos");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除视频 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 删除分类delete请求
        const res = await this.$http.delete(`rest/videos/${row._id}`);
        let { code, desc } = res.data;
        if (code === 200) {
          this.$message({
            type: "success",
            message: desc
          });
          // 删除后重新请求数据
          this.fetch();
        } else {
          this.$message({
            type: "warning",
            message: "删除失败"
          });
        }
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

