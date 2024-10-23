export type Genre = 'M' | 'F' | 'N';

export interface UserCourse {
  id: number;
  course: number;
  role: number;
  center: number;
  role_name: string;
  course_name: string;
  center_name: string;
  user: number;
}

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
  user_course: UserCourse[];
  users_course_active: number;
}

export interface UserCreate extends User {
  password: string;
}

export interface Token {
  token: string;
  user: User;
}

export type ILinkUserCourse = Pick<UserCourse, 'course' | 'role'>;
