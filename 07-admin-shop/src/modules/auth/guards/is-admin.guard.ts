import { useAuthStore } from '@auth/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  authStore.isAdmin ? next() : next({ name: 'home' });
};

export default isAdminGuard;
