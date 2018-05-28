<template>
  <h2>欢迎你,{{userInfo.nickName}}</h2>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'My',
    computed: mapState(['userInfo'])
  }
</script>

<style scoped>

</style>
