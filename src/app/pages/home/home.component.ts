import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SubjectsChart } from '@app/models/home';
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
  subjectsCharts = {} as SubjectsChart;

  barChartType = this.fb.control<'subjects' | 'types'>('subjects', {
    nonNullable: true,
  });

  difficultyChart = this.apexCharts.getDonut({
    title: 'Grau de Dificuldade',
    labels: [],
    series: [],
  });

  cognitiveChart = this.apexCharts.getDonut({
    title: 'Habilidade Cognitiva',
    labels: [],
    series: [],
  });

  typeChart = this.apexCharts.getDonut({
    title: 'Tipo',
    labels: [],
    series: [],
  });

  subjectsChart = this.apexCharts.getColumm({
    title: 'Habilidade Cognitiva',
    series: [],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getCharts();

    this.barChartType.valueChanges.subscribe((value) => {
      if (value === 'types') {
        this.subjectsChart.series = this.subjectsCharts.tipo;
        return;
      }

      this.subjectsChart.series = this.subjectsCharts.dificuldade;
    });
  }

  getCharts(form?: QuestionFilter) {
    if (form) this.filtering = true;
    this.homeService
      .getDashboard(form)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          this.subjectsCharts = response.subjects_chart;
          this.difficultyChart.series = response.difficulty_chart.series;
          this.cognitiveChart.series = response.cognitive_chart.series;
          this.typeChart.series = response.type_chart.series;
          this.subjectsChart.series = this.subjectsCharts.dificuldade;

          if (!this.filtering) {
            this.difficultyChart.labels = response.difficulty_chart.label;
            this.cognitiveChart.labels = response.cognitive_chart.label;
            this.typeChart.labels = response.type_chart.label;
          }

          console.log(this.typeChart);

          this.loading = false;
          this.filtering = false;
        },
        error: (error) => {
          this.error = error.status || 500;
          this.loading = false;
          this.filtering = false;
        },
      });
  }
}
