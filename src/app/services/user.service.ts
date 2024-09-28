import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  getUsers(filters: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<User[]>('/user', query);
  }
}
