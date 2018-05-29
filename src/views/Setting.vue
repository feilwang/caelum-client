<template>
  <div class="setting">
    <h2 class="pd15">设置</h2>
    <CellGroup>
      <Cell title="清理缓存" is-link @click="sorry"/>
      <Cell title="关于作者" is-link url="https://wfeil.com/about/"/>
      <Cell title="当前版本" value="0.0.1"/>
    </CellGroup>
    <CellGroup class="mt15">
      <Cell title="退出登录" @click="logout" is-link/>
    </CellGroup>
  </div>
</template>

<script>
  import {Cell, CellGroup, Dialog, Toast} from 'vant'

  export default {
    components: {
      CellGroup,
      Cell,
      Dialog,
      Toast
    },
    name: 'Setting',
    methods: {
      logout() {
        Dialog.confirm({
          title: '提示',
          message: '确定要退出吗？'
        }).then(() => {
          this.$store.dispatch('logout');
          this.$router.push({
            path: '/'
          })
        });
      },
      sorry() {
        Toast('还没有做好啦！O(∩_∩)O~')
      }
    }
  }
</script>

<style scoped>

</style>
