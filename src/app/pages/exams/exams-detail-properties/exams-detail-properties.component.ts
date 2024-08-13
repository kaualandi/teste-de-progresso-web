import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubjectAxis } from '@app/models/subject';
import { SubjectService } from '@app/services/subject.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-exams-detail-properties',
  templateUrl: './exams-detail-properties.component.html',
  styleUrls: ['./exams-detail-properties.component.scss'],
})
export class ExamsDetailPropertiesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  isTablet = window.innerWidth < 768;
  loading = false;
  loadingActions = '';
  error = 0;
  axis: SubjectAxis[] = [];

  formDetail = this.fb.group({
    title: ['', Validators.required],
    observations: [''],
  });

  axesWeightsForm = this.fb.group({
    new_axis: this.fb.control(0, Validators.min(1)),
    axis_list: this.fb.array([this.axisWeights(0)]),
  });

  ngOnInit() {
    this.loading = true;
    this.handleDeleteAxisClick(0);
    this.getAxis();
  }

  getExam() {
    this.loading = false;
  }

  getAxis() {
    this.subjectService.getAxis().subscribe({
      next: (response) => {
        this.axis = response;
        if (this.id) {
          this.getExam();
          return;
        }

        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  handleFormSubmit(draft: boolean, auto: boolean) {
    const axisList = this.axisList.getRawValue();
    if (!draft && axisList.length === 0) {
      this.notifier.notify('error', 'Deve selecionar pelo menos um eixo.');
      return;
    }

    this.notifier.notify('success', `${draft ? 'Com' : 'Sem'} rascunho.`);
    this.notifier.notify(
      'success',
      `Geração ${auto ? 'automática' : 'manual'}`
    );
  }

  handleAxesWeightsFormSubmit() {
    if (this.axesWeightsForm.controls.new_axis.invalid) {
      this.axesWeightsForm.controls.new_axis.markAsTouched();
      return;
    }

    const axisId = this.axesWeightsForm.value.new_axis as number;
    this.axesWeightsForm.controls.new_axis.reset();
    this.axisList.push(this.axisWeights(axisId));
  }

  axisName(id?: number | null) {
    return this.axis.find((axis) => axis.id === id)?.name;
  }

  axisWeights(id: number) {
    return this.fb.group({
      axis: this.fb.control(id, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      easy: this.fb.control(5, { nonNullable: true }),
      medium: this.fb.control(5, { nonNullable: true }),
      hard: this.fb.control(5, { nonNullable: true }),
    });
  }

  handleDeleteAxisClick(index: number) {
    this.axisList.removeAt(index);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isTablet = window.innerWidth < 768;
  }

  get filteredAxis() {
    const usedAxis = this.axisList.value.map((axis) => axis.axis);
    return this.axis.filter((axis) => !usedAxis.includes(axis.id));
  }

  get axisList() {
    return this.axesWeightsForm.controls.axis_list;
  }
}
