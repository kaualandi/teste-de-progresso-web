import { Injectable } from '@angular/core';
import { Course } from '@app/models/course';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpService) {}

  getCourses() {
    return this.http.get<Course[]>('/courses');
  }
}
