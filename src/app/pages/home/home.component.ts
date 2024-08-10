import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { CHECK_TYPES } from '@app/constants/questions';
import { Subject } from '@app/models/subject';
import { ApexChartsService } from '@app/services/apex-charts.service';
import { HomeService } from '@app/services/home.service';
import { SubjectService } from '@app/services/subject.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apexCharts: ApexChartsService,
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private homeService: HomeService
  ) {}

  loading = false;
  error = 0;
  filtering = false;
  subjects: Subject[] = [];
  now = moment();

  form = this.fb.group({
    start_year: this.fb.control(moment().set('year', 2000), {
      nonNullable: true,
    }),
    end_year: this.fb.control(moment(), { nonNullable: true }),
    authorship: this.fb.control(['own', 'other'], { nonNullable: true }),
    subjects: this.fb.control<number[]>([], { nonNullable: true }),
  });

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
    this.getSubjects();
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

  getSubjects() {
    this.loading = true;
    this.subjectService.getSubjects().subscribe({
      next: (response) => {
        this.subjects = response;
        const subjectsIds = response.map((subject) => subject.id);
        this.form.controls.subjects.setValue(subjectsIds);
        this.getCharts();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  getCharts() {
    this.homeService.getDashboard(this.form.getRawValue()).subscribe({
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

  setYear(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>,
    year: 'start_year' | 'end_year'
  ) {
    const ctrlValue = this.form.get(year)?.value;
    if (!ctrlValue) return;
    ctrlValue.year(normalizedYear.year());
    this.form.controls.start_year.setValue(ctrlValue);
    datepicker.close();
  }
}
