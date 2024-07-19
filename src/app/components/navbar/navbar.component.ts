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
import { IUser } from '@app/models/user';
import { environment } from '@env';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { ConfirmExitComponent } from '../modals/confirm-exit/confirm-exit.component';

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
    private dialog: MatDialog
  ) {}

  loading = false;
  error = 0;
  navbarStatus = localStorage.getItem('menu');
  user$ = this.storage.watchUser().pipe(takeUntilDestroyed());
  user = {} as IUser;
  isMobile = window.innerWidth < 1024;
  isWide = window.innerWidth > 1865;

  navbarPages = NAVBAR_PAGES;
  unreadNotifications = false;
  version = environment.version;
  production = environment.production;

  ngOnInit(): void {
    // this.loading = true;
    // this.getMe();

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
    this.error = 0;
    this.authService.getMe().subscribe({
      next: (data) => {
        this.user = data;
        this.navbarPages = NAVBAR_PAGES.filter((page) =>
          page.roles.some((role) => this.user.role.includes(role))
        );
        this.storage.myself = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.status;
        this.loading = false;
      },
    });
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmExitComponent, {
      panelClass: 'dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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
