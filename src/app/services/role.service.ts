import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission, Role } from '@app/models/role';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}

  formErrorHandler = this.http.formErrorHandler;

  getRoles(filters?: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<Role[]>('/role', query);
  }

  getRole(id: number) {
    return this.http.get<Role>(`/role/${id}`);
  }

  createRole(role: Partial<Role>) {
    return this.http.post<Role>('/role/', role);
  }

  updateRole(id: number, role: Partial<Role>) {
    return this.http.patch<Role>(`/role/${id}/`, role);
  }

  deleteRole(id: number) {
    return this.http.delete(`/role/${id}`);
  }

  listPermissions() {
    return this.http.get<Permission[]>('/role/list_permission');
  }
}
