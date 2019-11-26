<template>
  <div>
    <h1>召唤师技能列表</h1>
    <el-table :data="skills">
      <el-table-column prop="_id"
                       label="ID"
                       width="240">
      </el-table-column>

      <el-table-column prop="name"
                       label="名称">
      </el-table-column>

      <el-table-column prop="icon"
                       label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon"
               style="height: 3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="$router.push(`/skills/edit/${scope.row._id}`)">编辑
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
      skills: []
    };
  },
  methods: {
    // 请求table列表数据
    async fetch() {
      const res = await this.$http.get("rest/skills");
      this.skills = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 删除分类delete请求
        const res = await this.$http.delete(`rest/skills/${row._id}`);
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

