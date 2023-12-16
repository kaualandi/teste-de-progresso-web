import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { GeolocationService } from './../../services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private notifier: NotifierService,
    private geolocation: GeolocationService
  ) {}

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

  getLocation() {
    this.geolocation.getCurrentPosition().subscribe((data) => {
      console.log(data);
    });
  }
}
