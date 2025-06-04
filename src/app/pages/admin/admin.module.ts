import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateCenterComponent } from '@app/components/modals/create-center/create-center.component';
import { SharedModule } from '@app/components/shared/shared.module';

import { CreateAxisComponent } from '../../components/modals/create-axis/create-axis.component';
import { CreateCourseComponent } from '../../components/modals/create-course/create-course.component';
import { CreateRoleComponent } from '../../components/modals/create-role/create-role.component';
import { CreateSubjectComponent } from '../../components/modals/create-subject/create-subject.component';
import { CreateUserComponent } from '../../components/modals/create-user/create-user.component';
import { AdminRoutingModule } from './admin-routing.module';
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

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    UserDetailComponent,
    RolesComponent,
    RoleDetailComponent,
    CreateRoleComponent,
    CoursesComponent,
    CourseDetailComponent,
    CreateCourseComponent,
    AxesComponent,
    AxisDetailComponent,
    CreateAxisComponent,
    SubjectsComponent,
    SubjectDetailComponent,
    CreateSubjectComponent,
    CentersComponent,
    CenterDetailComponent,
    CreateCenterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSelectModule,
  ],
})
export class AdminModule {}
