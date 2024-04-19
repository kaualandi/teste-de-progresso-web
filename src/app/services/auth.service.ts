import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IToken, IUser } from '@models/user';
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

  login(body: BodyJson) {
    return this.http.post<IToken>('core/auth/', {
      ...body,
      password: Md5.init(body['password']).toUpperCase(),
    });
  }

  register(data: BodyJson) {
    return this.http.post<IToken>('core/register/', data);
  }

  getMe() {
    return this.http.get<IUser>('core/get-user/');
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
    return this.http.post('core/forgot-password/', { email });
  }

  rescurePassword(body: BodyJson) {
    body['new_password'] = Md5.init(body['new_password']).toUpperCase();
    return this.http.post('core/change-password-forgot-password/', body);
  }
}
