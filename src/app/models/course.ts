export interface Course {
  id: number;
  name: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  coordinator: number;
  pro_rector: number;
  users: number[];
}

export interface Center {
  id: number;
  name: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  director?: number;
  pro_rector?: number;
}
