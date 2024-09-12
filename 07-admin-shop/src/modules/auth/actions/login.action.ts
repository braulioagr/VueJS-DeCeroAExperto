import { tesloApi, ApiEndpoints } from '@api/index';
import type { LoginResponse } from '@auth/types';
import type { AuthResponse } from '@auth/interfaces/auth.response';
import { isAxiosError } from 'axios';

export const loginAction = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>(ApiEndpoints.AuthLogin, {
      email,
      password,
    });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }
    console.log(error);
    throw new Error('No se pudo realizar la peticion');
  }
};
