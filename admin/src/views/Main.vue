<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <el-menu router
               unique-opened
               :default-active="$route.path">
        <!-- 内容管理 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>内容管理
          </template>

          <!-- 分类 -->
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>

          <!-- 物品 -->
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>

          <!-- 铭文 -->
          <el-menu-item-group>
            <template slot="title">铭文</template>
            <el-menu-item index="/inscriptions/create">新建铭文</el-menu-item>
            <el-menu-item index="/inscriptions/list">铭文列表</el-menu-item>
          </el-menu-item-group>

          <!-- <el-submenu index="1-3">
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-submenu> -->

          <!-- 英雄 -->
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>

          <!-- 召唤师技能 -->
          <el-menu-item-group>
            <template slot="title">召唤师技能</template>
            <el-menu-item index="/skills/create">新建召唤师技能</el-menu-item>
            <el-menu-item index="/skills/list">召唤师技能列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 运营管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-postcard"></i>运营管理
          </template>
          <!-- 文章 -->
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <!-- 视频 -->
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
          <!-- 广告位-->
          <el-menu-item-group>
            <template slot="title">广告</template>
            <el-menu-item index="/ads/create">新建广告</el-menu-item>
            <el-menu-item index="/ads/list">广告列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 设置中心 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>设置中心
          </template>
          <!-- 广告位 -->
          <el-menu-item-group>
            <template slot="title">管理权限</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>admin</span>
      </el-header>

      <el-main>
        <!-- 默认以组件来区分，由于编辑与新建用同一个组件，所以使用路径来进行区分重置数据 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "admin",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>