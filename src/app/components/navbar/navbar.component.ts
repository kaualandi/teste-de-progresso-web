import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from '@animations/route-animation';
import { NAVBAR_PAGES } from '@app/constants/navbar';
import { User } from '@app/models/user';
import { ThemeService } from '@app/services/theme.service';
import { environment } from '@env';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { ConfirmExitComponent } from '../modals/confirm-exit/confirm-exit.component';
import {
  ChangeRoleModalComponent,
  CONFIG,
} from './../modals/change-role-modal/change-role-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [slideInAnimation, offcanvasTopAnimation],
})
export class NavbarComponent implements OnInit {
  @Input() colapse: 'vertical' | 'horizontal' = 'vertical';
  @ViewChild('drawer') drawer: MatSidenav = {} as MatSidenav;

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private dialog: MatDialog,
    private themeService: ThemeService
  ) {}

  loading = false;
  error = 0;
  user$ = this.storage.watchUser().pipe(takeUntilDestroyed());
  user = {} as User;
  isMobile = window.innerWidth < 1024;
  isWide = window.innerWidth > 1865;

  navbarPages = NAVBAR_PAGES;
  unreadNotifications = false;
  version = environment.version;
  production = environment.production;

  ngOnInit(): void {
    this.loading = true;

    if (!this.storage.myself.id) this.getMe();
    if (this.storage.myself.id) this.loadUserPreferencesAndLinksByRole();

    this.user$.subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  drawerToggle() {
    this.drawer.toggle();
    setTimeout(() => {
      dispatchEvent(new Event('resize'));
    }, 300);
  }

  getMe() {
    this.authService.getMe().subscribe({
      next: (data) => {
        this.storage.myself = data;
        this.loadUserPreferencesAndLinksByRole();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  loadUserPreferencesAndLinksByRole() {
    this.user = this.storage.myself;
    this.navbarPages = NAVBAR_PAGES.filter(
      (page) => page.isAdmin === this.user.is_admin
    );

    const activeRole = this.user.user_course.find(
      (uc) => uc.id === this.user.users_course_active
    );

    if (!activeRole && !this.user.is_admin) {
      this.authService.logout();
      return;
    }

    if (activeRole && !this.user.is_admin) {
      this.navbarPages = this.navbarPages.filter((page) =>
        page.roles.includes(activeRole.role)
      );
    }

    if (this.user.is_admin) {
      this.themeService.setAdminTheme(true);
    }

    this.loading = false;
  }

  openChangeRoleModal() {
    const dialogRef = this.dialog.open(ChangeRoleModalComponent, { ...CONFIG });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.getMe();
      }
    });
  }

  openBaseUrlPage(path: string) {
    window.open(environment.base_url + `/${path}/`, '_blank');
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmExitComponent, {
      panelClass: 'dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.themeService.setAdminTheme(false);
        this.authService.logout();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (!event.target) return;
    this.isMobile = (event.target as Window).innerWidth <= 1024;
    this.isWide = (event.target as Window).innerWidth >= 1865;
  }
}
