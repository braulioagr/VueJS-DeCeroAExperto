import isAdminGuard from '@auth/guards/is-admin.guard';
import isAuthenticatedGuard from '@auth/guards/is-authenticated.guard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@admin/layouts/AdminLayout.vue'),
};
