import { createRouter, createWebHistory } from 'vue-router';
import MainScroll from '~/pages/MainScroll.vue';
import DispNone from '~/pages/DispNone.vue';
import HomePage from '../pages/HomePage.vue';
import HomeView from '../pages/HomeView.vue';
import LayoutFirst from '../pages/LayoutFirst.vue';
const EditorPage = () => import('../pages/EditorPage.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/homeview',
      name: 'homeview',
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
    },
    {
      path: '/mainscroll',
      name: 'home',
      component: MainScroll
    },
    {
      path: '/dispnone',
      name: 'dispnone',
      component: DispNone
    }
  ]
});

export default router;
