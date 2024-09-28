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
