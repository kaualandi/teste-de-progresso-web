import { Component } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  questions = [
    {
      id: 1,
      statement: 'Qual é a capital do Brasil?',
      difficulty: 'MEDIUM',
      subject: 'Geografia',
      created_by: 'João Silva',
      reviewer: 'Maria Oliveira',
      created_at: '2023-05-01',
      updated_at: '2023-05-15',
    },
    {
      id: 2,
      statement: 'Qual é a fórmula da água?',
      difficulty: 'HARD',
      subject: 'Química',
      created_by: 'Ana Souza',
      reviewer: 'Pedro Almeida',
      created_at: '2023-06-10',
      updated_at: '2023-06-20',
    },
    {
      id: 3,
      statement: 'Qual é a cor do céu?',
      difficulty: 'EASY',
      subject: 'Física',
      created_by: 'Lucas Ferreira',
      reviewer: 'Fernanda Rodrigues',
      created_at: '2023-07-01',
      updated_at: '2023-07-05',
    },
    {
      id: 4,
      statement: 'Qual é a moeda oficial do Brasil?',
      difficulty: 'MEDIUM',
      subject: 'Economia',
      created_by: 'Isabela Gomes',
      reviewer: 'Gustavo Pereira',
      created_at: '2023-08-01',
      updated_at: '2023-08-10',
    },
  ];
}
