import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      dificulty: 'easy',
    },
    {
      id: 2,
      question: 'What is the largest ocean in the world?',
      dificulty: 'medium',
    },
    {
      id: 3,
      question: 'What is the formula for the area of a circle?',
      dificulty: 'hard',
    },
  ];
}
