<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="content-app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import NavBar from "./components/NavBar";
  export default {
    name: 'App',
    components: {
      NavBar
    },
    mounted() {
      this.getWebsiteConfig()
    },
    methods: {
      ...mapActions(['getWebsiteConfig'])
    }
  }
</script>

<style lang="less">
  .content-app {
    margin-top: 80px;
    padding: 0 2%;
  }
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
