import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILinkUserCourse, User, UserCreate } from '@app/models/user';
import { Md5 } from 'md5-typescript';
import { forkJoin } from 'rxjs';
import { CourseService } from './course.service';
import { HttpService } from './http.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpService,
    private roleService: RoleService,
    private courseService: CourseService
  ) {}

  formErrorHandler = this.http.formErrorHandler;

  getUsers(filters: Record<string, string>) {
    const query = new HttpParams({ fromObject: filters });
    return this.http.get<User[]>('/user', query);
  }

  createUser(user: Partial<UserCreate>) {
    return this.http.post<User>('/user/', {
      ...user,
      password: Md5.init(user.password).toUpperCase(),
    });
  }

  updateUserAdmin(id: number, user: Partial<User>) {
    return this.http.patch<User>(`/user/${id}/`, user);
  }

  updateUserAdminPassword(id: number, user: Partial<UserCreate>) {
    return this.http.patch<User>(`/user/${id}/`, {
      password: Md5.init(user.password).toUpperCase(),
    });
  }

  getUser(id: number) {
    return this.http.get<User>(`/user/${id}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`/user/${id}`);
  }

  getCoursesAndRoles() {
    return forkJoin([
      this.courseService.getCourses(),
      this.roleService.getRoles(),
    ]);
  }

  linkCourseRole(userId: number, body: ILinkUserCourse) {
    return this.http.post(`/user/link_course_role/`, {
      ...body,
      user: userId,
    });
  }
}
