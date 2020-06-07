<template>
  <div>
    <Form ref="formRegister" :model="formRegister" :rules="ruleRegister">
      <FormItem prop="username">
        <Input type="text" v-model="formRegister.username" placeholder="用户名" size="large" @on-enter="handleRegister">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="email">
        <Input v-model="formRegister.email" placeholder="电子邮箱" size="large" @on-enter="handleRegister">
          <Icon type="ios-email-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formRegister.password" placeholder="密码" size="large" @on-enter="handleRegister">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="passwordAgain">
        <Input type="password" v-model="formRegister.passwordAgain" placeholder="请再次输入密码" size="large" @on-enter="handleRegister">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
    <div class="footer">
      <Button
        type="primary"
        @click="handleRegister"
        class="btn" long
        :loading="btnRegisterLoading">
        注册
      </Button>
      <Button
        type="ghost"
        @click="switchMode('login')"
        class="btn" long>
        已经注册，现在登录
      </Button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import api from '../../api'
  import {FormMixin} from '../../components/mixins'
  export default {
    mixins: [FormMixin],
    mounted() {

    },
    data() {
      const CheckUsernameNotExist = (rule, value, callback) => {
        api.user.checkExistByUsername(value).then(res => {
          // console.log(res)
          if(res.data.data === true) {
            callback(new Error('用户名已存在'))
          }
          else {
            callback()
          }
        }).catch(() => {
          callback()
        })
      }
      const CheckEmailNotExist = (rule, value, callback) => {
        api.user.checkExistByEmail(value).then(res => {
          // console.log(res)
          if(res.data.data === true) {
              callback(new Error('邮箱已存在'))
          }
          else {
              callback()
          }
        }).catch(() => {
          callback()
        })
      }
      const CheckPassword = (rule, value, callback) => {
        if(this.formRegister.password !== '') {
          this.$refs.formRegister.validateField('passwordAgain')
        }
        callback()
      }
      const CheckAgainPassword = (rule, value, callback) => {
        if(value !== this.formRegister.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        callback()
      }
      return {
        btnRegisterLoading: false,
        formRegister: {
          username: '',
          password: '',
          passwordAgain: '',
          email: ''
        },
        ruleRegister: {
          username: [
            {required: true, trigger: 'blur'},
            {validator: CheckUsernameNotExist, trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', trigger: 'blur'},
            {validator: CheckEmailNotExist, trigger: 'blur'}
          ],
          password: [
            {required: true, trigger: 'blur', min: 6, max: 20},
            {validator: CheckPassword, trigger: 'blur'}
          ],
          passwordAgain: [
            {required: true, validator: CheckAgainPassword, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['changeModalStatus', 'getUser']),
      switchMode(mode) {
        this.changeModalStatus({
          mode,
          visible: true
        })
      },
      handleRegister() {
        this.validateForm('formRegister').then(valid => {
          let formData = Object.assign({}, this.formRegister)
          delete formData['passwordAgain']
          this.btnRegisterLoading = true
          api.user.register(formData).then(res => {
            console.log(res)
            this.$success("注册成功")
            this.switchMode('login')
            this.btnRegisterLoading = false
          }).catch(() => {
            this.$error('注册失败')
            this.btnRegisterLoading = false
          })
        })
      }
    },
    computed: {
      ...mapGetters(['website', 'modalStatus'])
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









