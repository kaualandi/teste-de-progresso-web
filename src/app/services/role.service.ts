import { Injectable } from '@angular/core';
import { Role } from '@app/models/role';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}

  getRoles() {
    return this.http.get<Role[]>('/role');
  }
}
