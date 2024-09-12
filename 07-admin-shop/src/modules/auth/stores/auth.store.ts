import { checkAuthAction, loginAction, registerAction } from '@auth/actions';
import { AuthStatus } from '@auth/constants';
import type { User } from '@auth/interfaces';
import type { LoginResponse } from '@auth/types';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authStatus: Ref<AuthStatus> = ref<AuthStatus>(AuthStatus.Checking);
  const user: Ref<User | undefined> = ref();
  const token: Ref<string> = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResp: LoginResponse = await loginAction(email, password);

      if (!loginResp.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = loginResp.user;
      token.value = loginResp.token;
      return true;
    } catch (error) {
      logout();
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResp = await registerAction(fullName, email, password);

      if (!registerResp.ok) {
        logout();
        return { ok: false, message: registerResp.message };
      }

      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return { ok: true, message: '' };
    } catch (error) {
      return { ok: false, message: 'Error al registrar el usuario' };
    }
  };

  const logout = (): boolean => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    //Properties
    user,
    token,
    authStatus,

    //Computed
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),

    //Methods
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
