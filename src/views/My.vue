<template>
  <div class="my">
    <router-view></router-view>
    <div v-if="path=='/my'">
      <Card class="userinfo">
        <div slot="title" class="nick">{{userInfo.nickName}}</div>
        <img slot="thumb" class="avatar" src="/static/img/icons/android-chrome-512x512.png"/>
        <div slot="desc" class="desc">{{userInfo.signature}}</div>
      </Card>
      <CellGroup class="mt15">
        <Cell title="昵称" is-link @click="edit('nickName')"/>
        <Cell title="签名" is-link @click="edit('signature')"/>
        <Cell title="性别" :value="sexText" is-link @click="edit('sex')"/>
        <Cell title="手机号" :value="userInfo.phone" is-link @click="edit('phone')"/>
        <Cell title="生日" :value="userInfo.birth" is-link @click="edit('birth')"/>
        <Cell title="邮箱" :value="userInfo.email" is-link @click="edit('email')"/>
      </CellGroup>
    </div>

  </div>
</template>

<script>
  import {Card, Cell, CellGroup, Dialog, Field} from 'vant'
  import {mapState} from 'vuex'

  export default {
    name: 'My',
    components: {
      Card,
      Cell,
      CellGroup,
      Dialog,
      Field
    },
    computed: {
      sexText() {
        if (this.userInfo.sex === 0) {
          return '女'
        } else if (this.userInfo.sex === 1) {
          return '男'
        } else {
          return ''
        }
      },
      path() {
        return this.$route.path
      },
      ...mapState(['userInfo', 'editDialogShow'])
    },
    methods: {
      edit(type) {
        this.$router.push(`/my/edit?type=${type}`)
      }
    }
  }
</script>

<style scoped>
  .my {
    padding-top: 15px;
  }

  .userinfo {
    background-color: #fff;
  }

  .nick {
    margin-top: 8px;
    font-size: 18px;
  }

  .avatar {
    border-radius: 100%;
    border: 1px solid #eee;
  }

  .desc {
    margin-top: 10px;
    font-size: 12px;
  }


</style>
