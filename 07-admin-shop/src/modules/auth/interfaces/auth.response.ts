import type { User } from '@auth/interfaces';

export interface AuthResponse {
  user: User;
  token: string;
}
