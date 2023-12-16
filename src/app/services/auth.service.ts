import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';
import { CookieService } from 'ngx-cookie-service';
import { IToken } from '../models/user';
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
    body['password'] = Md5.init(body['password']);
    return this.http.post<IToken>('auth/login', body);
  }

  register(data: BodyJson) {
    return this.http.post<IToken>('auth/register', data);
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
}
