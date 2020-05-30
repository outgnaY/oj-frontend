<template>
  <Panel>
    <div slot="title">{{title}}</div>
    <div slot="extra">
      <Button v-if="listVisible"></Button>
      <Button v-else ></Button>
    </div>
  </Panel>
</template>

<script>
  import api from '../../oj/api'
  import Pagination from "./Pagination";
  export default {
    name: 'Announcement',
    components: {
      Pagination
    },
    data() {
      return {
        listVisible:true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
          this.getAnnouncementList()
      },
      getAnnouncementList(page = 1) {

      }
    }
  }
</script>
