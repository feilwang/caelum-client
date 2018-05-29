<template>
  <div>
    <h2 class="pd15">目标列表</h2>
    <Cell v-for="item in list" :key="item.id" :title="item.title"/>
  </div>
</template>

<script>
  import {List, Cell} from 'vant';

  export default {
    components: {
      List,
      Cell
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
          title: '给女神说晚安'
        }]
      };
    },
    methods: {}
  }
</script>

<style scoped>
</style>
