import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from '../models/user';
import { BodyJson, HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(email: string, password: string) {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    return this.http.post<IToken>('auth/login', body);
  }

  register(data: BodyJson) {
    return this.http.post<IToken>('auth/register', data);
  }
}
