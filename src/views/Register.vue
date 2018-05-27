<template>
  <div class="register pd15">
    <h2 class="text-center">注册</h2>
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
    <CellGroup>
      <Field
        v-model="repassword"
        label="重复密码"
        type="repassword"
        icon="clear"
        placeholder="请再次输入密码"
        required
        @click-icon="repassword = ''"
      />
    </CellGroup>
    <div class="mt15 text-right">
      <router-link to="/login">已有帐号？</router-link>
    </div>
    <Button class="mt15" slot="button" size="normal" :block="true" type="primary">注册</Button>
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
    name: 'Register',
    data() {
      return {
        phone: '',
        password: '',
        repassword: ''
      }
    }
  }
</script>

<style scoped>
  h2 {
    padding: 40px 0 60px;
  }
</style>
