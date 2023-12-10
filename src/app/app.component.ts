import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private theme: ThemeService) {}

  ngOnInit() {
    this.theme.loadCurrentTheme();
    AOS.init();
  }
}
