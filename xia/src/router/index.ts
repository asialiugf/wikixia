import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import LayoutFirst from '../pages/LayoutFirst.vue';
const EditorPage = () => import('../pages/EditorPage.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorPage
    },
    {
      path: '/layfirst',
      name: 'layfirst',
      component: LayoutFirst
    }
  ]
});

export default router;
