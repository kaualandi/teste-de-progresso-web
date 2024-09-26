export type Genre = 'M' | 'F' | 'N';

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  last_login: string;
  is_admin: boolean;
  is_active: string;
  created_at: string;
  updated_at: string;
}

export interface Token {
  token: string;
  user: User;
}
