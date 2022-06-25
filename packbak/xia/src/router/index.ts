import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const LayoutTest = () => import('../views/LayoutTest.vue');
const Layoutfirst = () => import('../views/LayoutFirst.vue');
const EditorView = () => import('../views/EditorView.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/layout',
      name: 'layout',
      component: LayoutTest
    },
    {
      path: '/layfirst',
      name: 'layfirst',
      component: Layoutfirst
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView
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
