import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@app/models/role';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}

  getRoles(filters?: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<Role[]>('/role', query);
  }

  deleteRole(id: number) {
    return this.http.delete(`/role/${id}`);
  }
}
