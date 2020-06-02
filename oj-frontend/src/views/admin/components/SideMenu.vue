<template>
  <el-menu class="vertical-menu" :router="true" :default-active="currentPath">
    <el-menu-item index="/"><i class="el-icon-fa-dashboard"></i>仪表板</el-menu-item>
    <el-submenu index="general">
      <template slot="title"><i class="el-icon-menu"></i>常用设置</template>
      <el-menu-item index="/user">用户</el-menu-item>
      <el-menu-item index="/announcement">公告</el-menu-item>
      <el-menu-item index="/conf">系统配置</el-menu-item>
      <el-menu-item index="/judge-server">判题服务器</el-menu-item>
    </el-submenu>
    <el-submenu index="problem">
      <template slot="title"><i class="el-icon-fa-bars"></i>问题</template>
      <el-menu-item index="/problems">问题列表</el-menu-item>
      <el-menu-item index="/problem/create">创建问题</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'SideMenu',
    data() {
      return {
        currentPath: ''
      }
    },
    mounted() {
      this.currentPath = this.$route.path
    },
  }
</script>

<style lang="less" scoped>
  .vertical-menu {
    overflow: auto;
    width: 205px;
    height: 100%;
    position: fixed !important;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
  }
</style>
