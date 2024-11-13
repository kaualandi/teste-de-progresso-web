import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { StorageService } from '@app/services/storage.service';

export const CONFIG = {
  maxWidth: '640px',
  width: '100%',
};

@Component({
  selector: 'app-change-role-modal',
  templateUrl: './change-role-modal.component.html',
  styleUrls: ['./change-role-modal.component.scss'],
})
export class ChangeRoleModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ChangeRoleModalComponent>
  ) {}

  loading = false;
  courseOfRoles = this.fb.array([this.fb.control(1)]);
  role = this.fb.control(this.storage.myself.users_course_active);

  roles = [
    {
      id: 1,
      role: 'NDE',
      courses: [
        {
          id: 1,
          name: 'Administração',
        },
      ],
    },
  ];

  ngOnInit() {
    this.courseOfRoles.clear();
    this.roles = [];
    this.organizeRoles();

    this.roles.forEach((role) => {
      this.courseOfRoles.push(this.fb.control(role.courses[0].id));
    });
  }

  confirmUserCourse() {
    const roleIndex = this.roles.findIndex(
      (role) => role.id === this.role.value
    );

    if (roleIndex === -1) return;

    const courseIndex = this.roles[roleIndex].courses.findIndex(
      (c) => c.id === this.getCourseControl(roleIndex).value
    );

    if (courseIndex === -1) return;

    this.loading = true;
    this.authService
      .changeUserCourse({
        user_course: this.roles[roleIndex].courses[courseIndex].id,
      })
      .subscribe(() => {
        this.storage.myself.users_course_active =
          this.roles[roleIndex].courses[courseIndex].id;
        this.storage.changeUser();
        this.loading = false;
        this.dialogRef.close(true);
      });
  }

  organizeRoles() {
    this.storage.myself.user_course.forEach((userCourse) => {
      if (userCourse.id === this.storage.myself.users_course_active) {
        this.role.patchValue(userCourse.role);
      }

      const roleIndex = this.roles.findIndex(
        (role) => role.id === userCourse.role
      );

      if (roleIndex !== -1) {
        this.roles[roleIndex].courses.push({
          id: userCourse.id,
          name: userCourse.course_name,
        });
        return;
      }

      this.roles.push({
        id: userCourse.role,
        role: userCourse.role_name,
        courses: [
          {
            id: userCourse.id,
            name: userCourse.course_name,
          },
        ],
      });
    });
  }

  getCourseControl(index: number) {
    return this.courseOfRoles.at(index);
  }
}
