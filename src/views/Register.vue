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
    <Button class="mt15" slot="button" size="normal" :block="true" type="primary" @click="register">注册</Button>
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
    name: 'Register',
    data() {
      return {
        phone: '',
        password: '',
        repassword: ''
      }
    },
    methods: {
      register() {
        let phone = this.phone.trim();
        let password = this.password;
        let repassword = this.repassword;
        if (phone.length !== 11) {
          Toast('请输入正确的手机号');
          return;
        }
        if (password.length === 0) {
          Toast('请输入密码');
          return;
        }
        if (repassword.length === 0) {
          Toast('请再次输入密码');
          return;
        }
        if (repassword !== password) {
          Toast('两次密码不一致');
          return;
        }
        this.$request({
          api: 'register',
          params: {
            phone,
            password,
            repassword
          }
        }, res => {
          let data = res.data;
          Toast.success('注册成功');
          this.$store.dispatch('login', {token: data.token, userInfo: data});
          this.$router.push('/')
        }, err => {
          Toast(err.message);
        })
      }
    }
  }
</script>

<style scoped>
  h2 {
    padding: 40px 0 60px;
  }
</style>
