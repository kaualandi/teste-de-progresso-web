import { Injectable } from '@angular/core';
import { Subject } from '@app/models/subject';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpService) {}
  formErrorHandler = this.http.formErrorHandler;

  getSubjects() {
    return this.http.get<Subject[]>('/subject/');
  }
}