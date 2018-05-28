<template>
  <div class="home">
    <router-view></router-view>
    <Tabbar v-model="active">
      <TabbarItem icon="completed" to="/list">打卡</TabbarItem>
      <TabbarItem icon="contact" to="/my">我的</TabbarItem>
      <TabbarItem icon="more-o" to="/setting">设置</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant'

  export default {
    name: 'Home',
    components: {
      Tabbar,
      TabbarItem
    },
    created() {
      let path = this.$route.path;
      if (path === '/list') {
        this.active = 0;
      } else if (path === '/my') {
        this.active = 1;
      } else if (path === '/setting') {
        this.active = 2;
      } else {
        this.active = 0;
      }
    },
    data() {
      return {
        active: 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
