import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { firstValueFrom } from 'rxjs';

export const permissionGuard: CanActivateFn = async (route) => {
  const storage = inject(StorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!storage.myself.id) {
    const user = await firstValueFrom(authService.getMe());
    storage.myself = user;
  }

  const activeRole = storage.myself.user_course.find(
    (uc) => uc.id === storage.myself.users_course_active
  );

  if (!activeRole && !storage.myself.is_admin) {
    authService.logout();
    return false;
  }

  if (route.data['isAdmin'] === storage.myself.is_admin) {
    return true;
  }

  const roles = route.data['roles'] as number[] | undefined;
  if (!roles) {
    return true;
  }

  if (activeRole && roles.includes(activeRole.role)) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
