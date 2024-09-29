import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission, Role } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
})
export class RoleDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  role = {} as Role;
  loading = false;
  loadingSave = false;
  error = 0;
  permissions: Permission[] = [];
  checkedPermissions: number[] = [];

  roleForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getPermissions();
  }

  getPermissions() {
    this.roleService.listPermissions().subscribe({
      next: (response) => {
        this.permissions = response;
        this.getRole();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  getRole() {
    this.roleService.getRole(this.id).subscribe({
      next: (response) => {
        this.role = response;
        this.roleForm.patchValue(response);
        this.checkedPermissions = this.role.permissions;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.status || 500;
      },
    });
  }

  handleFormSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    this.loadingSave = true;
    this.roleService
      .updateRole(this.id, {
        name: this.roleForm.value.name,
        permissions: this.checkedPermissions,
      })
      .subscribe({
        next: () => {
          this.notifier.notify('success', 'Perfil salvo com sucesso');
          this.loadingSave = false;
          this.router.navigate(['/admin/roles']);
        },
        error: (error) => {
          this.roleService.formErrorHandler(this.roleForm, error.error);
          this.loadingSave = false;
        },
      });
  }

  togglePermission(permission: number) {
    if (this.checkedPermissions.includes(permission)) {
      this.checkedPermissions = this.checkedPermissions.filter(
        (p) => p !== permission
      );
      return;
    }

    this.checkedPermissions.push(permission);
  }

  toggleViewPermissions(perm: Permission) {
    const hasView = this.checkedPermissions.includes(perm.view);
    if (hasView) {
      this.checkedPermissions = this.checkedPermissions.filter(
        (p) =>
          p !== perm.view &&
          p !== perm.add &&
          p !== perm.change &&
          p !== perm.delete
      );
      return;
    }

    this.checkedPermissions.push(perm.view);
  }
}
