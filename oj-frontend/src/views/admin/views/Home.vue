<template>
  <div>
    <KatexEditor></KatexEditor>

    <Simditor v-model="content"></Simditor>
    <Announcement></Announcement>
  </div>

</template>

<script>
  import KatexEditor from "../components/KatexEditor";
  import Simditor from "../components/Simditor";
  import Announcement from "../components/Announcement";
  export default {
      name: 'Home',
      components: {
          Announcement,
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
