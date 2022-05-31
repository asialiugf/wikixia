import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const CssMedia = () => import('../views/CssMedia.vue');
const SlotTest = () => import('../views/SlotTest.vue');
const LayoutDemo = () => import('../views/LayoutDemo.vue');
// const Timepass = () => import('../views/TimePass.vue');
const Timepass = () => import('../views/UseIntervalFn.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/timepass',
      name: 'timepass',
      component: Timepass
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/media',
      name: 'media',
      component: CssMedia
    },
    {
      path: '/slot',
      name: 'slot',
      component: SlotTest
    },
    {
      path: '/layout',
      name: 'layout',
      component: LayoutDemo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
