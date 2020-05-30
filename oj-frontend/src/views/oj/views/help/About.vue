<template>
  <div>
    <Panel class="container">
      <div slot="title">编译器 & 评测机</div>
      <div class="content markdown-body">
        <ul>
          <li v-for="lang in languages">{{lang.languageName}} ( {{lang.languageDescription}} )
            <pre>{{lang.compileCommand}}</pre>
          </li>
        </ul>
      </div>
    </Panel>

    <Panel :padding="15" class="container">
      <div slot="title">结果解释</div>
      <div class="content">
        <ul>
          <li><b>等待评分 & 正在评分</b> : 您的解答将很快被评测，请等待结果。</li>
          <li><b>编译错误</b> : 无法编译您的源代码，点击链接查看编译器的输出。</li>
          <li><b>答案正确</b> : 您的答案是正确的</li>
          <li><b>答案错误</b> ： 您的程序输出结果与正确答案不符</li>
          <li><b>运行时错误</b> ： 您的程序异常终止</li>
          <li><b>运行超时</b> ： 您的程序使用的CPU时间超出限制</li>
          <li><b>内存超限</b> ： 您的程序使用的内存超出限制</li>
          <li><b>系统错误</b> ： 评测机出错，请联系管理员</li>
        </ul>
      </div>
    </Panel>
  </div>
</template>

<script>
  import utils from '../../../../utils/utils'
  export default {
      data() {
          return {
              languages: []
          }
      },
      beforeRouteEnter(to, from, next) {
          utils.getLanguages().then(languages => {
            console.log(languages)
              next(vm => {
                  vm.languages = languages
              })
          })
      }
  }
</script>
<style scoped lang="less">
  .container {
    margin-bottom: 20px;
    .content {
      font-size: 16px;
      margin: 0 50px 20px 50px;
      > ul {
        list-style: disc;
        li {
          line-height: 2;
          .title {
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
