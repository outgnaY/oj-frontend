<template>
  <div>
    <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
      <FormItem prop="username">
        <Input type="text" v-model="formLogin.username" placeholder="用户名" size="large" @on-enter="handleLogin">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formLogin.password" placeholder="密码" size="large" @on-enter="handleLogin">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
    <div class="footer">
      <Button
        type="primary"
        @click="handleLogin"
        class="btn" long
        :loading="btnLoginLoading">
        登录
      </Button>
      <a @click.stop="handleBtnClick('register')">还没有账号，立即注册</a>
      <a @click.stop="goResetPassword" style="float: right">忘记密码</a>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import api from '../../api'
  import {FormMixin} from '../../components/mixins'
  export default {
    mixins: [FormMixin],
    data() {
      return {
        btnLoginLoading: false,
        formLogin: {
          username: '',
          password: '',
        },
        ruleLogin: {
          username: [
            {required: true, trigger: 'blur', min: 5, max: 20},
          ],
          password: [
            {required: true, trigger: 'blur', min: 6, max: 20}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['changeModalStatus', 'getUser']),
      handleBtnClick(mode) {
        this.changeModalStatus({mode, visible: true})
      },
      handleLogin() {
        this.validateForm('formLogin').then(valid => {
          this.btnLoginLoading = true
          let formData = Object.assign({}, this.formLogin)
          api.user.login(formData).then(res => {
            console.log(res)
            this.btnLoginLoading = false
            this.changeModalStatus({visible: false})
            this.getUser()
            this.$success('欢迎回来')
          }).catch(() => {
            this.btnLoginLoading = false
          })
        })
      },
      goResetPassword() {
        console.log("goResetPassword")
      }
    },
  computed: {
      /*
      ...mapGetters(['modalStatus']),
      visible: {
        get() {
          return this.modalStatus.visible
        },
        set(value) {
          this.changeModalStatus({visible: value})
        }
      }
      */
    }
  }
</script>

<style scoped lang="less">
  .footer {
    overflow: auto;
    margin-top: 20px;
    margin-bottom: -15px;
    text-align: left;
    .btn {
      margin: 0 0 15px 0;
      &:last-child {
        margin: 0;
      }
    }
  }
</style>


