<template>
  <div class="login pd15">
    <h2 class="text-center">登录</h2>
    <CellGroup>
      <Field
        v-model="phone"
        label="手机号"
        icon="clear"
        placeholder="请输入手机号"
        required
        @click-icon="phone = ''"
      />
    </CellGroup>
    <CellGroup>
      <Field
        v-model="password"
        label="密码"
        type="password"
        icon="clear"
        placeholder="请输入密码"
        required
        @click-icon="password = ''"
      />
    </CellGroup>
    <div class="mt15 text-right">
      <router-link to="/register">还没有帐号？</router-link>
    </div>
    <Button class="mt15" slot="button" size="normal" :block="true" type="primary" @click="$router.push('/')">登录</Button>
  </div>
</template>

<script>
  import {Field, CellGroup, Button} from 'vant';

  export default {
    components: {
      CellGroup,
      Field,
      Button
    },
    name: 'Login',
    data() {
      return {
        phone: '',
        password: ''
      }
    }
  }
</script>

<style scoped>
  h2 {
    padding: 40px 0 60px;
  }
</style>
