import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { PageErrorComponent } from '@components/shared/page-error/page-error.component';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';

const SPR = false;

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'rescure-password',
    loadChildren: () =>
      import('@pages/rescure-password/rescure-password.module').then(
        (m) => m.RescurePasswordModule
      ),
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        canActivate: [permissionGuard],
        data: {
          roles: [1, 2, 3, 4, 5, 6],
        },
        loadChildren: () =>
          import('@pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'questions',
        canActivate: [permissionGuard],
        data: {
          roles: [1, 2, 3],
        },
        loadChildren: () =>
          import('@pages/questions/questions.module').then(
            (m) => m.QuestionsModule
          ),
      },
      {
        path: 'exams',
        canActivate: [permissionGuard],
        data: {
          roles: [1, 3, 4],
        },
        loadChildren: () =>
          import('@pages/exams/exams.module').then((m) => m.ExamsModule),
      },
      {
        path: 'settings',
        canActivate: [permissionGuard],
        data: {
          roles: [1, 2, 3, 4, 5, 6],
        },
        loadChildren: () =>
          import('@pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'admin',
        canActivate: [permissionGuard],
        data: {
          roles: [],
          isAdmin: true,
        },
        loadChildren: () =>
          import('@pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: '**',
        component: PageErrorComponent,
        data: { code: 404 },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: SPR ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
