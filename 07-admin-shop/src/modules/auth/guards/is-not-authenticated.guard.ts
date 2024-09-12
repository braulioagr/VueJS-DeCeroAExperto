import { AuthStatus } from '@auth/constants';
import { useAuthStore } from '@auth/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  authStore.authStatus === AuthStatus.Authenticated ? next({ name: 'home' }) : next();
};

export default isNotAuthenticatedGuard;
