import { tesloApi } from '@api/index';
import type { LoginResponse } from '@auth/interfaces';
import type { AuthResponse } from '@auth/interfaces/auth.response';
import { ApiEndpoints } from '@common/constants';
import { isAxiosError } from 'node_modules/axios/index.cjs';

export const loginAction = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>(ApiEndpoints.UsersLogin, {
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
