import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '@app/models/subject';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpService) {}

  formErrorHandler = this.http.formErrorHandler;

  getSubjects(filters?: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<Subject[]>('/subject/', query);
  }

  getSubject(id: number) {
    return this.http.get<Subject>(`/subject/${id}/`);
  }

  createSubject(data: Partial<Subject>) {
    return this.http.post<Subject>('/subject/', data);
  }

  updateSubject(id: number, data: Partial<Subject>) {
    return this.http.patch<Subject>(`/subject/${id}/`, data);
  }

  deleteSubject(id: number) {
    return this.http.delete(`/subject/${id}/`);
  }
}
