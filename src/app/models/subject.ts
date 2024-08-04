export interface SubjectAxis {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface SubjectCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface Subject {
  id: number;
  name: string;
  axis: number;
  axis_obj: SubjectAxis;
  category: number;
  category_obj: SubjectCategory;
  created_at: string;
  updated_at: string;
}
