import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  private getHeaders(json = false) {
    const headers = {
      'Content-Type': json
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
      Authorization: 'token ' + this.storage.token,
    };
    return headers;
  }
}
