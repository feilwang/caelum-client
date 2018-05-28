import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Home = () => import('../views/Home.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const List = () => import('../views/List.vue');
const My = () => import('../views/My.vue');
const Setting = () => import('../views/Setting.vue');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          name: 'List',
          component: List
        },
        {
          path: '/list',
          name: 'List',
          component: List
        },
        {
          path: '/my',
          name: 'My',
          component: My
        },
        {
          path: '/setting',
          name: 'Setting',
          component: Setting
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
