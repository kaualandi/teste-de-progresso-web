import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectAxis } from '@app/models/subject';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AxisService {
  constructor(private http: HttpService) {}

  formErrorHandler = this.http.formErrorHandler;

  getAxes(filters?: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<SubjectAxis[]>('/axis', query);
  }

  getAxis(id: number) {
    return this.http.get<SubjectAxis>(`/axis/${id}`);
  }

  createAxis(data: Partial<SubjectAxis>) {
    return this.http.post<SubjectAxis>('/axis/', data);
  }

  updateAxis(id: number, data: Partial<SubjectAxis>) {
    return this.http.patch<SubjectAxis>(`/axis/${id}/`, data);
  }

  deleteAxis(id: number) {
    return this.http.delete(`/axis/${id}/`);
  }
}
