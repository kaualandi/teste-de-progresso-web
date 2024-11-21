import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectAxis } from '@app/models/subject';
import { AxisService } from '@app/services/axis.service';
import { SubjectService } from '@app/services/subject.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss'],
})
export class SubjectDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private axisService: AxisService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  subject = {} as Subject;
  loading = false;
  loadingSave = false;
  error = 0;
  axes: SubjectAxis[] = [];

  subjectForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    axis: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getAxes();
  }

  getAxes() {
    this.axisService.getAxes().subscribe({
      next: (response) => {
        this.axes = response;
        this.getSubject();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  getSubject() {
    this.subjectService.getSubject(this.id).subscribe({
      next: (response) => {
        this.subject = response;
        this.subjectForm.patchValue(response);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.status || 500;
      },
    });
  }

  handleFormSubmit() {
    if (this.subjectForm.invalid) {
      this.subjectForm.markAllAsTouched();
      return;
    }

    this.loadingSave = true;
    this.subjectService
      .updateSubject(this.id, this.subjectForm.value)
      .subscribe({
        next: () => {
          this.notifier.notify('success', 'Assunto salvo com sucesso');
          this.loadingSave = false;
          this.router.navigate(['/admin/subjects']);
        },
        error: (error) => {
          this.subjectService.formErrorHandler(this.subjectForm, error.error);
          this.loadingSave = false;
        },
      });
  }
}
