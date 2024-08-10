import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CHECK_TYPES } from '@app/constants/questions';
import { QuestionFilter } from '@app/models/question';
import { ApexChartsService } from '@app/services/apex-charts.service';
import { HomeService } from '@app/services/home.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apexCharts: ApexChartsService,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {}

  loading = false;
  error = 0;
  filtering = false;

  barChartType = this.fb.control<'subjects' | 'types'>('subjects', {
    nonNullable: true,
  });

  difficultyChart = this.apexCharts.getDonut({
    title: 'Questões por dificuldade',
    labels: ['Fácil', 'Médio', 'Difícil'],
    series: [44, 55, 41],
  });

  cognitiveChart = this.apexCharts.getDonut({
    title: 'Questões por habilidade cognitiva',
    labels: [
      'Recordar',
      'Compreender',
      'Aplicar',
      'Analisar',
      'Avaliar',
      'Criar',
    ],
    series: [44, 55, 41, 17, 15, 12],
  });

  typeChart = this.apexCharts.getDonut({
    title: 'Questões por tipo',
    labels: CHECK_TYPES.map((type) => type.label),
    series: [44, 55, 41, 17, 15],
  });

  subjectsChart = this.apexCharts.getColumm({
    title: 'Habilidade cognitiva por grau dificuldade',
    series: [
      {
        data: [
          {
            x: 'Recordar',
            y: 10,
          },
          {
            x: 'Compreender',
            y: 20,
          },
          {
            x: 'Aplicar',
            y: 15,
          },
          {
            x: 'Analisar',
            y: 25,
          },
          {
            x: 'Avaliar',
            y: 30,
          },
          {
            x: 'Criar',
            y: 40,
          },
        ],
        color: 'var(--green-color)',
        name: 'Fácil',
      },
      {
        data: [
          {
            x: 'Recordar',
            y: 20,
          },
          {
            x: 'Compreender',
            y: 30,
          },
          {
            x: 'Aplicar',
            y: 25,
          },
          {
            x: 'Analisar',
            y: 35,
          },
          {
            x: 'Avaliar',
            y: 40,
          },
          {
            x: 'Criar',
            y: 50,
          },
        ],
        color: 'var(--yellow-color)',
        name: 'Médio',
      },
      {
        data: [
          {
            x: 'Recordar',
            y: 30,
          },
          {
            x: 'Compreender',
            y: 40,
          },
          {
            x: 'Aplicar',
            y: 35,
          },
          {
            x: 'Analisar',
            y: 45,
          },
          {
            x: 'Avaliar',
            y: 50,
          },
          {
            x: 'Criar',
            y: 60,
          },
        ],
        color: 'var(--red-color)',
        name: 'Difícil',
      },
    ],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getCharts();
    console.log(CHECK_TYPES.map((type) => type.label));

    this.barChartType.valueChanges.subscribe((value) => {
      if (value === 'types') {
        this.subjectsChart = this.apexCharts.getColumm({
          title: 'Habilidade cognitiva por tipo',
          series: [
            {
              data: [
                {
                  x: 'Recordar',
                  y: 10,
                },
                {
                  x: 'Compreender',
                  y: 20,
                },
                {
                  x: 'Aplicar',
                  y: 15,
                },
                {
                  x: 'Analisar',
                  y: 25,
                },
                {
                  x: 'Avaliar',
                  y: 30,
                },
                {
                  x: 'Criar',
                  y: 40,
                },
              ],
              color: 'var(--green-color)',
              name: 'Resposta única',
            },
            {
              data: [
                {
                  x: 'Recordar',
                  y: 20,
                },
                {
                  x: 'Compreender',
                  y: 30,
                },
                {
                  x: 'Aplicar',
                  y: 25,
                },
                {
                  x: 'Analisar',
                  y: 35,
                },
                {
                  x: 'Avaliar',
                  y: 40,
                },
                {
                  x: 'Criar',
                  y: 50,
                },
              ],
              color: 'var(--yellow-color)',
              name: 'Afirmação incorreta',
            },
            {
              data: [
                {
                  x: 'Recordar',
                  y: 30,
                },
                {
                  x: 'Compreender',
                  y: 40,
                },
                {
                  x: 'Aplicar',
                  y: 35,
                },
                {
                  x: 'Analisar',
                  y: 45,
                },
                {
                  x: 'Avaliar',
                  y: 50,
                },
                {
                  x: 'Criar',
                  y: 60,
                },
              ],
              color: 'var(--red-color)',
              name: 'Resposta multipla',
            },
            {
              data: [
                {
                  x: 'Recordar',
                  y: 30,
                },
                {
                  x: 'Compreender',
                  y: 40,
                },
                {
                  x: 'Aplicar',
                  y: 35,
                },
                {
                  x: 'Analisar',
                  y: 45,
                },
                {
                  x: 'Avaliar',
                  y: 50,
                },
                {
                  x: 'Criar',
                  y: 60,
                },
              ],
              color: 'var(--blue-color)',
              name: 'Asserção e razão',
            },
            {
              data: [
                {
                  x: 'Recordar',
                  y: 30,
                },
                {
                  x: 'Compreender',
                  y: 40,
                },
                {
                  x: 'Aplicar',
                  y: 35,
                },
                {
                  x: 'Analisar',
                  y: 45,
                },
                {
                  x: 'Avaliar',
                  y: 50,
                },
                {
                  x: 'Criar',
                  y: 60,
                },
              ],
              color: 'var(--purple-color)',
              name: 'Interpretação',
            },
          ],
        });
      }
    });
  }

  getCharts(form?: QuestionFilter) {
    this.homeService
      .getDashboard(form)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.loading = false;
        },
        error: (error) => {
          this.error = error.status || 500;
          this.loading = false;
        },
      });
  }
}
