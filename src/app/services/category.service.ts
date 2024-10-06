import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectCategory } from '@app/models/subject';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpService) {}

  formErrorHandler = this.http.formErrorHandler;

  getCategories(filters?: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<SubjectCategory[]>('/category/', query);
  }

  getCategory(id: number) {
    return this.http.get<SubjectCategory>(`/category/${id}/`);
  }

  updateCategory(id: number, data: Partial<SubjectCategory>) {
    return this.http.patch<SubjectCategory>(`/category/${id}/`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`/category/${id}/`);
  }
}
