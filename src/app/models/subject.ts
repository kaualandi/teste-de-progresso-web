export interface SubjectAxis {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface Subject {
  id: number;
  name: string;
  axis: number;
  axis_instance: SubjectAxis;
  created_at: string;
  updated_at: string;
}
