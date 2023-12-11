import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form = new FormControl('');
  names = [
    'João da Silva',
    'Maria de Fátima',
    'Carol do Santos',
    'Lucas dos Santos',
    'Ana e Luiz',
  ];
}
