import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import * as AOS from 'aos';
import { FullpageLoadingService } from './services/fullpage-loading.service';
import { LanguageService } from './services/language.service';
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
    public translate: TranslateService,
    public language: LanguageService,
    private notifier: NotifierService
  ) {
    translate.setDefaultLang(language.current);
    translate.use(language.current);
  }

  loading = this.fullpageLoading.loading;

  ngOnInit() {
    this.theme.loadCurrentTheme();
    AOS.init();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!(event.ctrlKey && event.shiftKey && event.key === 'D')) return;

    if (document.designMode === 'on') {
      document.designMode = 'off';
      this.notifier.notify('success', 'Modo Design desativado!');
      return;
    }

    document.designMode = 'on';
    this.notifier.notify('success', 'Modo Design ativado!');
  }
}
