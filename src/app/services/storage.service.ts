import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  UserSubject = new Subject<void>();
  private myUser: User = {} as User;

  get myself() {
    return this.myUser;
  }

  set myself(user: User) {
    this.myUser = user;
  }

  watchUser() {
    return this.UserSubject.asObservable();
  }

  changeUser(): void {
    this.UserSubject.next();
  }

  get token() {
    if (this.cookies) {
      return this.cookieService.get('token');
    } else {
      return sessionStorage.getItem('token');
    }
  }

  get cookies() {
    return localStorage.getItem('cookies') === 'true';
  }

  set cookies(value: boolean) {
    localStorage.setItem('cookies', value.toString());
  }
}
