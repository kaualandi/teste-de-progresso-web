import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  offcanvasTopAnimation,
  slideInAnimation,
} from 'src/app/animations/route-animation';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [slideInAnimation, offcanvasTopAnimation],
})
export class NavbarComponent implements OnInit {
  @Input() colapse: 'vertical' | 'horizontal' = 'vertical';
  @ViewChild('navbar') navbar: ElementRef<HTMLElement> | undefined;

  constructor(private storage: StorageService) {}

  loading = false;

  navbar_hidden = true;
  scroll = false;
  navbar_height = 0;

  ngOnInit(): void {
    this.onWindowScroll();

    this.getMe();
    this.storage
      .watchUser()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.getMe();
        },
      });
  }

  getMe() {
    // ? Requisição para pegar o usuário logado
    // * Adicione o código abaixo no tratamento de erro da requisição
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }

  logout() {
    this.storage.logout();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scroll = window.scrollY;
    this.scroll = scroll > 200;

    setTimeout(() => {
      if (this.navbar) {
        this.navbar_height = this.navbar.nativeElement.offsetHeight;
      }
    }, 300);
  }
}
