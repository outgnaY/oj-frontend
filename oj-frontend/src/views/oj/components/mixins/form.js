
export default {
  methods: {
    validateForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if(!valid) {
            this.$error('请检查表单是否填写正确')
          }
          else {
            resolve(valid)
          }
        })
      })
    }
  }
}
