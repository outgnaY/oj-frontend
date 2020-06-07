<template>

</template>

<script>
  import api from '../../api'
  export default {
    mounted() {
      api.user.logout().then(res => {
        this.$store.dispatch('clearUser')
        this.$router.replace({
          path: '/'
        })
      })
    }
  }
</script>
