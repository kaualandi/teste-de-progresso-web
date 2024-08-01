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
      statement:
        'Explique o conceito de complexidade de tempo e como ele é utilizado na análise de algoritmos.',
      difficulty: 'MEDIUM',
      subject: 'Algoritmos',
      created_by: 'Professor Carvalho',
      reviewer: 'Dr. Silva',
      created_at: '2024-07-01',
      updated_at: '2024-07-15',
    },
    {
      id: 2,
      statement:
        'Descreva as diferenças entre os paradigmas de programação orientada a objetos e funcional.',
      difficulty: 'HARD',
      subject: 'Programação',
      created_by: 'Dr. Almeida',
      reviewer: 'Professora Santos',
      created_at: '2024-06-10',
      updated_at: '2024-06-20',
    },
    {
      id: 3,
      statement:
        'Qual é a importância da normalização em bancos de dados relacionais?',
      difficulty: 'EASY',
      subject: 'Banco de Dados',
      created_by: 'Professora Costa',
      reviewer: 'Dr. Marques',
      created_at: '2024-07-01',
      updated_at: '2024-07-05',
    },
    {
      id: 4,
      statement:
        'Explique a diferença entre IPv4 e IPv6 e por que a transição é necessária.',
      difficulty: 'MEDIUM',
      subject: 'Redes de Computadores',
      created_by: 'Professor Lima',
      reviewer: 'Dr. Rocha',
      created_at: '2024-08-01',
      updated_at: '2024-08-10',
    },
    {
      id: 5,
      statement:
        'Quais são as principais diferenças entre um sistema operacional monolítico e um sistema operacional microkernel?',
      difficulty: 'HARD',
      subject: 'Sistemas Operacionais',
      created_by: 'Dr. Barbosa',
      reviewer: 'Professor Souza',
      created_at: '2024-07-15',
      updated_at: '2024-07-25',
    },
    {
      id: 6,
      statement:
        'Explique como o protocolo de controle de congestionamento TCP funciona.',
      difficulty: 'MEDIUM',
      subject: 'Redes de Computadores',
      created_by: 'Professora Lima',
      reviewer: 'Dr. Oliveira',
      created_at: '2024-06-20',
      updated_at: '2024-06-30',
    },
    {
      id: 7,
      statement:
        'Descreva o funcionamento básico de um compilador e as etapas envolvidas no processo de compilação.',
      difficulty: 'MEDIUM',
      subject: 'Compiladores',
      created_by: 'Professor Nunes',
      reviewer: 'Dra. Almeida',
      created_at: '2024-07-10',
      updated_at: '2024-07-18',
    },
    {
      id: 8,
      statement:
        'Qual é a diferença entre memória volátil e não volátil, e onde cada tipo é usado em um computador?',
      difficulty: 'EASY',
      subject: 'Arquitetura de Computadores',
      created_by: 'Professora Martins',
      reviewer: 'Dr. Costa',
      created_at: '2024-07-05',
      updated_at: '2024-07-12',
    },
  ];

  questionsSections = {
    awaiting_your_opinion: [
      this.questions[0],
      this.questions[1],
      this.questions[2],
    ],
    awaiting_reviewer_opinion: [this.questions[3], this.questions[4]],
    pending_changes: [this.questions[5]],
    drafts: [this.questions[6]],
    approved: [this.questions[7]],
    registered: [],
    reviewed_by_you: [],
  };

  get questionsKeys() {
    return Object.keys(this.questionsSections);
  }

  getQuestionBySection(section: string) {
    return this.questionsSections[
      section as keyof typeof this.questionsSections
    ];
  }

  getQuestionsTitlesByKey(key: string) {
    return {
      awaiting_your_opinion: 'Aguardando seu parecer',
      awaiting_reviewer_opinion: 'Aguardando parecer do revisor',
      pending_changes: 'Aguardando alterações',
      drafts: 'Rascunhos',
      approved: 'Aprovadas',
      registered: 'Cadastradas',
      reviewed_by_you: 'Revisadas por você',
    }[key];
  }
}
