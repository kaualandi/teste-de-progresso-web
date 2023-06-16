import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { CookiesLoginComponent } from 'src/app/components/modals/cookies-login/cookies-login.component';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storageService: StorageService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CookiesLoginComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        StorageService,
      ],
      imports: [MatDialogModule, ReactiveFormsModule, MatCheckboxModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    storageService = TestBed.inject(StorageService);
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
    component.login_form.controls.remember.setValue(true);
    storageService.cookies = false;
    spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<CookiesLoginComponent>);
    component.openCookieDialog();
    expect(matDialog.open).toHaveBeenCalledWith(CookiesLoginComponent, {
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
});
