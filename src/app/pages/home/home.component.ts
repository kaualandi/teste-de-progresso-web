import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private notifier: NotifierService) {}

  names = [
    'João da Silva',
    'Maria de Fátima',
    'Carol do Santos',
    'Lucas dos Santos',
    'Ana e Luiz',
  ];

  showNotification() {
    this.notifier.notify('success', 'Hello world!');
  }
}
