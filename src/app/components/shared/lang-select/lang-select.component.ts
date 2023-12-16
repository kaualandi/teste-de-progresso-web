import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.scss'],
})
export class LangSelectComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {}

  langs = ['pt-br', 'en'];
  selected = this.langs[0];

  ngOnInit(): void {
    this.selected = this.storage.language;
  }

  selectLang(lang: string) {
    this.translate.use(lang);
    this.storage.language = lang;
    this.selected = lang;
  }
}
