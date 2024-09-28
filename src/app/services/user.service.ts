import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCreate } from '@app/models/user';
import { Md5 } from 'md5-typescript';
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

  createUser(user: Partial<UserCreate>) {
    return this.http.post<User>('/user/', {
      ...user,
      password: Md5.init(user.password).toUpperCase(),
    });
  }
}
