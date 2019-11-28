import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    redirect: '/home/user',
    children: [{
      path: 'user',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
    }, {
      path: 'contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
    }]
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
