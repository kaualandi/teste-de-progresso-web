import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CookiesLoginComponent } from 'src/app/components/modals/cookies-login/cookies-login.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storageService: StorageService;
  let httpServiceMock: Partial<HttpService>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    httpServiceMock = {
      post: jasmine.createSpy('post'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CookiesLoginComponent],
      providers: [
        { provide: HttpService, useValue: httpServiceMock },
        StorageService,
      ],
      imports: [MatDialogModule, ReactiveFormsModule, MatCheckboxModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve desabilitar o botão de login se o formulário for inválido', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    component.login_form.controls.email.setValue('');
    component.login_form.controls.password.setValue('');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();
  });

  it('Deve habilitar o botão de login se o formulário for válido', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    component.login_form.controls.email.setValue('test@example.com');
    component.login_form.controls.password.setValue('password');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });

  it('Deve exibir a caixa de diálogo de cookies quando "Lembrar-me" é ativado e não foi permitido o uso de cookies', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<CookiesLoginComponent>);
    spyOnProperty(component.storage, 'cookies', 'get').and.returnValue(false);
    component.login_form.get('remember')?.setValue(true);
    component.openCookieDialog();
    fixture.detectChanges();
    expect(component.dialog.open).toHaveBeenCalledWith(CookiesLoginComponent, {
      panelClass: 'cookies-dialog',
      disableClose: true,
    });
  });

  it('Deve armazenar os cookies se a caixa de diálogo de cookies for confirmada', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<CookiesLoginComponent>);
    component.openCookieDialog();
    expect(storageService.cookies).toBeTrue();
  });

  it('Deve desmarcar a opção "Lembrar-me" se a caixa de diálogo de cookies for cancelada', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<CookiesLoginComponent>);
    component.openCookieDialog();
    expect(component.login_form.controls.remember.value).toBeFalse();
  });

  it('Deve apenas permitir que a opção "Lembrar-me" seja marcada se os cookies estiverem habilitados', () => {
    storageService.cookies = true;
    component.login_form.controls.remember.setValue(true);
    expect(component.login_form.controls.remember.value).toBeTrue();
  });

  it('Deve fazer login sem lembrar e redirecionar para a página principal', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of({ token: 'fake-token' }));

    component.login_form.patchValue({
      email: 'test@example.com',
      password: 'password',
      remember: false,
    });

    component.loginSubmitHandler();

    expect(component.loading).toBe(false);
    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('Não deve fazer login se o formulário for inválido', () => {
    spyOn(authService, 'login');

    component.login_form.patchValue({
      email: '',
      password: 'password',
      remember: true,
    });

    component.loginSubmitHandler();

    expect(component.loading).toBe(false);
    expect(authService.login).not.toHaveBeenCalled();
  });
});
