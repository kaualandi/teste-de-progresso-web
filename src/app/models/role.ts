export interface Permission {
  model: string;
  view: number;
  add: number;
  change: number;
  delete: number;
}

export interface Role {
  id: number;
  name: string;
  permissions: number[];
  created_at: string;
}
