import { adminRoutes } from '@admin/routes';
import { authRoutes } from '@auth/routes';
import ShopLayout from '@shop/layouts/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@shop/views/HomeView.vue'),
        },
      ],
    },
    authRoutes,
    adminRoutes,
  ],
});

export default router;
