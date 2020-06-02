<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'App',
        components: {

        },
        mounted() {
            // this.getWebsiteConfig()
        },
        methods: {
            // ...mapActions(['getWebsiteConfig'])
        }
    }
</script>

<style lang="less">
  #app {
    /*
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
     */
  }
</style>
