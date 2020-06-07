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
      <template v-if="!isAuthenticated">
        <div class="btn-menu">
          <Button type="ghost"
                  ref="loginBtn"
                  shape="circle"
                  @click="handleBtnClick('login')">登录</Button>
          <Button type="ghost"
                  shape="circle"
                  @click="handleBtnClick('register')"
                  style="margin-left:5px;">注册</Button>
        </div>
      </template>
      <template v-else>
        <Dropdown class="drop-menu" @on-click="handleRoute" placement="bottom" trigger="click">
          <Button type="text" class="drop-menu-title">{{user.username}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="/user-home">我的主页</Dropdown-item>
            <Dropdown-item name="/status?myself=1">我的提交</Dropdown-item>
            <Dropdown-item name="/setting/profile">我的设置</Dropdown-item>
            <Dropdown-item v-if="isAdminRole" name="/admin">管理</Dropdown-item>
            <Dropdown-item divided name="/logout">退出</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </template>
    </Menu>
    <Modal v-model="modalVisible" :width="400">
      <div slot="header" class="modal-title">欢迎来到{{website.websiteName}}</div>
      <component :is="modalStatus.mode" v-if="modalVisible"></component>
      <div slot="footer" style="display: none"></div>
    </Modal>
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
    .drop-menu {
      float: right;
      margin-right: 30px;
      position: absolute;
      right: 10px;
      &-title {
        font-size: 18px;
      }
    }
    .btn-menu {
      font-size: 16px;
      float: right;
      margin-right: 10px;
    }

  }
  .modal {
    &-title {
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import login from '../views/user/Login'
  import register from '../views/user/Register'
  export default {
    components: {
      login,
      register
    },
    mounted() {
      console.log('mounted')
      this.getUser()
    },
    methods: {
      ...mapActions(['getUser', 'changeModalStatus']),
      handleRoute(route) {
        if(route && route.indexOf('admin') < 0) {
          this.$router.push(route)
        }
        else {
          window.open('/admin/')
        }
      },
      handleBtnClick(mode) {
        this.changeModalStatus({
          visible: true,
          mode: mode
        })
      }
    },
    computed: {
      ...mapGetters(['website', 'modalStatus', 'user', 'isAuthenticated', 'isAdminRole']),
      activeMenu() {
        // console.log(this.$route.path.split('/'))
        return '/' + this.$route.path.split('/')[1]
      },
      modalVisible: {
        get() {
          // console.log(this.modalStatus.visible)
          return this.modalStatus.visible
        },
        set(value) {
          // console.log('set')
          this.changeModalStatus({visible: value})
        }
      }
    }
  }
</script>
