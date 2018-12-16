<template>
  <div>
    <h2 class="pd15">目标列表</h2>
    <Cell v-for="item in list" :key="item.id" :title="item.title" @click="sorry" is-link/>
  </div>
</template>

<script>
  import {List, Cell, Toast} from 'vant';

  export default {
    components: {
      List,
      Cell,
      Toast
    },
    name: 'List',
    data() {
      return {
        list: [{
          id: 1,
          title: '多喝热水'
        }, {
          id: 2,
          title: '早睡早起'
        }, {
          id: 3,
          title: '健腹轮训练'
        }, {
          id: 3,
          title: '跑步'
        }]
      };
    },
    methods: {
      sorry() {
        Toast('还没有做好啦！O(∩_∩)O~')
      }
    }
  }
</script>

<style scoped>
</style>
