<template>
  <div id="header">
    <Menu theme="light" mode="horizontal" @on-select="handleRoute" :active-name="activeMenu">
      <div class="logo"><span>{{website.websiteName}}</span></div>
      <Menu-item name="/">
        <Icon type="ios-home"></Icon>
        主页
      </Menu-item>
      <Menu-item name="/problem">
        <Icon type="ios-keypad"></Icon>
        问题
      </Menu-item>
      <Menu-item name="/status">
        <Icon type="ios-pulse"></Icon>
        状态
      </Menu-item>
      <Submenu name="about">
        <template slot="title">
          <Icon type="help"></Icon>
          关于
        </template>
        <Menu-item name="/about">
          评测机
        </Menu-item>
        <Menu-item name="/FAQ">
          常见问题
        </Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>

<style lang="less" scoped>
  #header {
    min-width: 1100px;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    .oj-menu {
      background: #fdfdfd;
    }
    .logo {
      margin-left: 2%;
      margin-right: 2%;
      font-size: 20px;
      float: left;
      line-height: 60px;
    }

  }
</style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    methods: {
      handleRoute(route) {
        if(route && route.indexOf('admin') < 0) {
          this.$router.push(route)
        }
        else {
          window.open('/admin/')
        }
      }
    },
    computed: {
        ...mapGetters(['website']),
      activeMenu() {
        // console.log(this.$route.path.split('/'))
        return '/' + this.$route.path.split('/')[1]
      }
    }
  }
</script>
