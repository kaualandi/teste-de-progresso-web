import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesLoginComponent } from './cookies-login.component';

describe('CookiesLoginComponent', () => {
  let component: CookiesLoginComponent;
  let fixture: ComponentFixture<CookiesLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
