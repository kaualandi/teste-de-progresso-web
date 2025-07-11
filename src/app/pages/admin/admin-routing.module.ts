import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AxesComponent } from './axes/axes.component';
import { AxisDetailComponent } from './axes/axis-detail/axis-detail.component';
import { CenterDetailComponent } from './centers/center-detail/center-detail.component';
import { CentersComponent } from './centers/centers.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RolesComponent } from './roles/roles.component';
import { SubjectDetailComponent } from './subjects/subject-detail/subject-detail.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';

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
    path: 'centers',
    component: CentersComponent,
  },
  {
    path: 'centers/:id',
    component: CenterDetailComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'roles/:id',
    component: RoleDetailComponent,
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
  },
  {
    path: 'subjects/:id',
    component: SubjectDetailComponent,
  },
  {
    path: 'axes',
    component: AxesComponent,
  },
  {
    path: 'axes/:id',
    component: AxisDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
