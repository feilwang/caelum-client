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
    <Button class="mt15" slot="button" size="normal" :block="true" type="primary" @click="login">登录</Button>
  </div>
</template>

<script>
  import {Field, CellGroup, Button, Toast} from 'vant';

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
    },
    methods: {
      login() {
        let phone = this.phone.trim();
        let password = this.password;
        if (phone.trim() === '') {
          Toast('请输入手机号');
          return;
        }
        if (password === '') {
          Toast('请输入密码');
          return;
        }
        this.$request({
          api: 'login',
          params: {
            phone,
            password
          }
        }, res => {
          let data = res.data;
          console.log('getUserInfo success:', res);
          Toast.success('登录成功！');
          this.$store.dispatch('login', {token: data.token, userInfo: data});
          this.$router.push(this.$route.query.redirect || '/')
        }, err => {
          console.warn('getUserInfo failed:', err);
          Toast(err.message);
        });
      }
    }
  }
</script>

<style scoped>
  h2 {
    padding: 40px 0 60px;
  }
</style>
