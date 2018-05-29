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
  import {mapState} from 'vuex'
  // import store from '../store'
  import {Tabbar, TabbarItem} from 'vant'

  let isLogined = false;

  export default {
    name: 'Home',
    components: {
      Tabbar,
      TabbarItem
    },
    computed: mapState(['userInfo']),
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
      if (!isLogined) {
        this.getUserInfo();
      }
    },
    methods: {
      getUserInfo() {
        this.$request({
          api: 'getUserInfo'
        }, res => {
          let data = res.data;
          isLogined = true;
          console.log('getUserInfo success:', res);
          this.$store.dispatch('login', {token: data.token, userInfo: data})
        }, err => {
          console.warn('getUserInfo failed:', err)
        })
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
