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

  role = this.fb.control(this.storage.myself.users_course_active);
  curseOfRoles = this.fb.array([this.fb.control(1)]);

  roles = [
    {
      id: 1,
      role: 'NDE',
      curses: [
        {
          id: 1,
          name: 'Administração',
        },
      ],
    },
  ];

  ngOnInit() {
    this.curseOfRoles.clear();
    this.roles = [];
    this.organizeRoles();

    this.roles.forEach((role) => {
      this.curseOfRoles.push(this.fb.control(role.curses[0].id));
    });
  }

  confirmUserCourse() {
    const roleIndex = this.roles.findIndex(
      (role) => role.id === this.role.value
    );

    if (roleIndex === -1) return;

    const curseIndex = this.roles[roleIndex].curses.findIndex(
      (curse) => curse.id === this.getCurseControl(roleIndex).value
    );

    if (curseIndex === -1) return;

    this.authService
      .changeUserCourse({
        user_course: this.roles[roleIndex].curses[curseIndex].id,
      })
      .subscribe(() => {
        this.storage.myself.users_course_active =
          this.roles[roleIndex].curses[curseIndex].id;
        this.storage.changeUser();
        this.dialogRef.close();
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
        this.roles[roleIndex].curses.push({
          id: userCourse.id,
          name: userCourse.course_name,
        });
        return;
      }

      this.roles.push({
        id: userCourse.role,
        role: userCourse.role_name,
        curses: [
          {
            id: userCourse.id,
            name: userCourse.course_name,
          },
        ],
      });
    });
  }

  getCurseControl(index: number) {
    return this.curseOfRoles.at(index);
  }
}
