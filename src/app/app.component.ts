import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { FullpageLoadingService } from './services/fullpage-loading.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private fullpageLoading: FullpageLoadingService,
    translate: TranslateService
  ) {
    translate.setDefaultLang('pt-br');
    translate.use('pt-br');
  }

  loading = this.fullpageLoading.loading;

  ngOnInit() {
    this.theme.loadCurrentTheme();
    AOS.init();
  }
}
