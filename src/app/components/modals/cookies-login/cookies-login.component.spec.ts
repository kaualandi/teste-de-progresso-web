import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesLoginComponent } from './cookies-login.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

describe('CookiesLoginComponent', () => {
  let component: CookiesLoginComponent;
  let fixture: ComponentFixture<CookiesLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiesLoginComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {}, // Pode deixar em branco ou fornecer um objeto mock do MatDialogRef se necessário
        },
      ],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
