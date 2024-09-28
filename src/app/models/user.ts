export type Genre = 'M' | 'F' | 'N';

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  last_login: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreate extends User {
  password: string;
}

export interface Token {
  token: string;
  user: User;
}
