export type Genre = 'M' | 'F' | 'N';

export type RoleUser = 'ADMIN' | 'TEACHER';
export interface IUser {
  id: number;
  role: RoleUser;
  profile_image: string;
}

export interface IToken {
  token: string;
}
