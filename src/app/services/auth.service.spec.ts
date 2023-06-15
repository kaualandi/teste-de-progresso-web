import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(() => {
    httpServiceMock = {
      post: jasmine.createSpy('post'),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: HttpService, useValue: httpServiceMock }],
    });

    authService = TestBed.inject(AuthService);
  });

  it('Deve ser criado', () => {
    expect(authService).toBeTruthy();
  });

  it('Deve chamar uma requisição post com os parâmetros corretos', () => {
    const email = 'example@example.com';
    const password = 'password';

    authService.login(email, password);

    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'auth/login',
      jasmine.any(Object)
    );
  });

  // Other tests for AuthService
});
