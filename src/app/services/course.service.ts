import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '@app/models/course';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpService) {}

  formErrorHandler = this.http.formErrorHandler;

  getCourses(filters?: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<Course[]>('/courses', query);
  }

  getCourse(id: number) {
    return this.http.get<Course>(`/courses/${id}/`);
  }

  createCourse(course: Partial<Course>) {
    return this.http.post<Course>('/courses/', course);
  }

  updateCourse(id: number, course: Partial<Course>) {
    return this.http.patch<Course>(`/courses/${id}/`, course);
  }

  deleteCourse(id: number) {
    return this.http.delete(`/courses/${id}/`);
  }
}
