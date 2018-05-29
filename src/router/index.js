import Vue from 'vue'
import Router from 'vue-router'
import {localCache} from '@/common/util';
import store from '@/store';
import {LOGIN} from '@/store/types';

const Home = () => import('../views/Home.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const List = () => import('../views/List.vue');
const My = () => import('../views/My.vue');
const Setting = () => import('../views/Setting.vue');
const Edit = () => import('../views/Edit.vue');

Vue.use(Router);

let token = localCache.get('token');
if (token) {
  store.commit(LOGIN, {token: token})
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'List',
          component: List
        },
        {
          path: 'list',
          name: 'List',
          component: List
        },
        {
          path: 'my',
          name: 'My',
          component: My,
          children: [
            {
              path: 'edit',
              name: 'Edit',
              component: Edit
            }]
        },
        {
          path: 'setting',
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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 未登录则跳转到登录页面
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

export default router;
