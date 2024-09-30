import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RolesComponent } from './roles/roles.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'roles/:id',
    component: RoleDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
