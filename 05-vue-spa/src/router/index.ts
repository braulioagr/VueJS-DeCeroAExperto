import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@landing/pages/HomePage.vue';
import isAuthenticatedGuard from '@/modules/auth/is-authenticated.guard';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    //Landing
    {
      path: '/',
      name: 'landing',
      component: () => import('@landing/layouts/LandingLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          beforeEnter: [isAuthenticatedGuard],
          component: HomePage,
        },
        {
          path: '/features',
          name: 'features',
          beforeEnter: [isAuthenticatedGuard],
          component: import('@landing/pages/FeaturesPage.vue'),
        },
        {
          path: '/pricing',
          name: 'pricing',
          beforeEnter: [isAuthenticatedGuard],
          component: import('@landing/pages/PricingPage.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          beforeEnter: [isAuthenticatedGuard],
          component: import('@landing/pages/ContactPage.vue'),
        },
        {
          path: '/pokemon/:id',
          name: 'pokemon',
          beforeEnter: [isAuthenticatedGuard],
          props: (route) => {
            const id = +route.params.id;

            return isNaN(id) ? { id: 1 } : { id };
          },
          component: import('@pokemon/pages/PokemonPage.vue'),
        },
      ],
    },

    //Auth
    {
      path: '/auth',
      redirect: '/login',
      component: () => import('@auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: import('@auth/pages/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: import('@auth/pages/RegisterPage.vue'),
        },
      ],
    },

    //NotFound
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: import('@common/pages/NotFoundPage.vue'),
    },
  ],
});

export default router;
