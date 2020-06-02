<template>
  <div class="container">
    <div>
      <SideMenu></SideMenu>
    </div>
    <div id="header">

    </div>
    <div class="content-app">
      <router-view></router-view>
    </div>

    <!--
    <KatexEditor></KatexEditor>
    -->
    <!--
    <Simditor v-model="content"></Simditor>
    -->
    <!--
    <Announcement></Announcement>
    -->
  </div>

</template>

<script>
  import KatexEditor from "../components/KatexEditor";
  import Simditor from "../components/Simditor";
  import SideMenu from "../components/SideMenu";
  export default {
      name: 'Home',
      components: {
          SideMenu,
          // Announcement,
          KatexEditor,
          Simditor
      },
      data() {
          return {
              content: ''
          }
      }
  }
</script>

<style lang="less">
  a {
    background-color: transparent;
  }

  a:active, a:hover {
    outline-width: 0
  }

  img {
    border-style: none
  }

  .container {
    overflow: auto;
    font-weight: 400;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background-color: #EDECEC;
    overflow-y: scroll;
    min-width: 1000px;
  }

  * {
    box-sizing: border-box;
  }

  #header {
    text-align: right;
    padding-left: 210px;
    padding-right: 30px;
    line-height: 50px;
    height: 50px;
    background: #F9FAFC;
    .screen-full {
      margin-right: 8px;
    }
  }

  .content-app {
    padding-top: 20px;
    padding-right: 10px;
    padding-left: 210px;
  }

  .footer {
    margin: 15px;
    text-align: center;
    font-size: small;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(0, 30px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUp-enter-active {
    animation: fadeInUp .8s;
  }

  .katex-editor {
    margin-right: 5px;
    /*font-size: 18px;*/
  }

</style>
