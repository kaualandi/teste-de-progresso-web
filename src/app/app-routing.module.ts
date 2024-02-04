import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { PageErrorComponent } from '@components/shared/page-error/page-error.component';

const SPR = false;

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: '',
    component: NavbarComponent,
    // canActivate: [authGuard], // ? Remover caso queira que mais rotas sejam acessadas sem autenticação
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pages/home/home.module').then((m) => m.HomeModule),
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
