import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "user" */ '../views/Search.vue'),
  },
  {
    path: '/user/:username',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
  },
  {
    path: '/user/:username/repo/:reponame',
    name: 'RepoView',
    component: () => import(/* webpackChunkName: "repo" */ '../views/Repo.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
