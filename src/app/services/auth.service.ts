import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token, User } from '@models/user';
import { Md5 } from 'md5-typescript';
import { CookieService } from 'ngx-cookie-service';
import { BodyJson, HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpService,
    private cookieService: CookieService,
    private storage: StorageService,
    private router: Router
  ) {}

  formErrorHandler = this.http.formErrorHandler;

  login(body: BodyJson) {
    return this.http.post<Token>('/api-token-auth/', {
      ...body,
      password: Md5.init(body['password']).toUpperCase(),
    });
  }

  getMe() {
    return this.http.get<User>('/user/logged-user/');
  }

  get ssl() {
    return location.protocol === 'https:';
  }

  /**
   * Função para setar o token no cookie
   * @param token Token que vem da API
   * @param keep Se true, o cookie expira em 60 dias, se false, o cookie expira quando o browser é fechado
   * @return void
   *
   * @author Kauã Landi
   */
  setToken(token: string, keep = false): void {
    if (this.storage.cookies) {
      this.cookieService.set(
        'token',
        token,
        keep ? 60 : undefined,
        '/',
        undefined,
        this.ssl,
        'Strict'
      );
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  logout() {
    this.setToken('', false);
    this.router.navigate(['/login']);
  }

  forgotPassword(email: string) {
    return this.http.post('/core/forgot-password/', { email });
  }

  rescurePassword(body: BodyJson) {
    body['new_password'] = Md5.init(body['new_password']).toUpperCase();
    return this.http.post('/core/change-password-forgot-password/', body);
  }

  changeUserCourse(body: BodyJson) {
    return this.http.patch('/role/role_active/', body);
  }
}
