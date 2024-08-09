import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { PageErrorComponent } from '@components/shared/page-error/page-error.component';
import { authGuard } from './guards/auth.guard';

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
        loadChildren: () =>
          import('@pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('@pages/questions/questions.module').then(
            (m) => m.QuestionsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
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
