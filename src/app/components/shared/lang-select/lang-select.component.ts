import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.scss'],
})
export class LangSelectComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  langs = ['pt-br', 'en'];
  selected = this.langs[0];

  ngOnInit(): void {
    this.selected = this.translate.currentLang;
  }

  selectLang(lang: string) {
    this.translate.use(lang);
    this.selected = lang;
  }
}
