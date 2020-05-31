<template>
  <div class="container">
    <Announcements></Announcements>
  </div>
</template>


<script>
  import Announcements from "../components/Announcements";
  import api from "../api"
  import time from "../../../utils/time"
  export default {
    name: 'Home',
    components: {
      Announcements
    }
  }
</script>

<style lang="less" scoped>
  .container {
    margin-top: 100px;
    margin-left: 50px;
    margin-right: 50px;
  }
</style>
