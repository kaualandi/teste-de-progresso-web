import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ApexChartsService } from '@app/services/apex-charts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apexCharts: ApexChartsService,
    private fb: FormBuilder
  ) {}

  loading = false;
  filtering = false;
  now = moment();
  form = this.fb.group({
    start_year: [moment().set('year', 2000)],
    end_year: [moment()],
    authorship: [['own', 'other']],
    subjects: this.fb.control<string[]>([]),
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

  subjectsChart = this.apexCharts.getColumm({
    title: 'Questões por assunto',
    series: [{ data: [44, 55, 41, 17, 15, 12], name: 'Questões' }],
    xaxis: [
      'Matemática',
      'Português',
      'História',
      'Geografia',
      'Biologia',
      'Química',
    ],
  });

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 600);
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
