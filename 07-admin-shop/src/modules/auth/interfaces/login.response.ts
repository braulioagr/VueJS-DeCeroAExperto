import type { User } from '@auth/interfaces';
interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export type LoginResponse = LoginSuccess | LoginError;
