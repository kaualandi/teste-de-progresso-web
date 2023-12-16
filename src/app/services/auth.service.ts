import { Injectable } from '@angular/core';
import { Md5 } from 'md5-typescript';
import { IToken } from '../models/user';
import { BodyJson, HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(body: BodyJson) {
    body['password'] = Md5.init(body['password']);
    return this.http.post<IToken>('auth/login', body);
  }

  register(data: BodyJson) {
    return this.http.post<IToken>('auth/register', data);
  }
}
