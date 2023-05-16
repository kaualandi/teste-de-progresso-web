import { StorageService } from './../../services/storage.service';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() colapse: 'vertical' | 'horizontal' = 'vertical';
  @ViewChild('navbar') navbar: ElementRef<HTMLElement> | undefined;

  constructor(private storage: StorageService) {}

  loading = false;

  navbarHidden = true;
  scroll = false;
  navbarHeight = 0;

  ngOnInit(): void {
    this.onWindowScroll();

    this.getMe();
    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  getMe() {
    // ? Requisição para pegar o usuário logado
    // * Adicione o código abaixo no tratamento de erro da requisição
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scroll = window.scrollY;
    this.scroll = scroll > 200;

    setTimeout(() => {
      if (this.navbar) {
        this.navbarHeight = this.navbar.nativeElement.offsetHeight;
      }
    }, 300);
  }
}
