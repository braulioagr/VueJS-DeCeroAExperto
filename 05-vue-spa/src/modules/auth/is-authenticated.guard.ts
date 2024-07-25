import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const isAuthenticatedGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  localStorage.setItem('lastPath', to.path);
  if (!localStorage.getItem('userId')) {
    return next({
      name: 'login',
    });
  }
  return next();
};

export default isAuthenticatedGuard;
