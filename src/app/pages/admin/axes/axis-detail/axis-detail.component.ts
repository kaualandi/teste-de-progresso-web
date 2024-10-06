import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectAxis } from '@app/models/subject';
import { User } from '@app/models/user';
import { AxisService } from '@app/services/axis.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-axis-detail',
  templateUrl: './axis-detail.component.html',
  styleUrls: ['./axis-detail.component.scss'],
})
export class AxisDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private axisService: AxisService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  axis = {} as SubjectAxis;
  loading = false;
  loadingSave = false;
  error = 0;
  users: User[] = [];

  axisForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    coordinator: [0, [Validators.required]],
    pro_rector: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getAxis();
  }

  getAxis() {
    this.axisService.getAxis(this.id).subscribe({
      next: (response) => {
        this.axis = response;
        this.axisForm.patchValue(response);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.status || 500;
      },
    });
  }

  handleFormSubmit() {
    if (this.axisForm.invalid) {
      this.axisForm.markAllAsTouched();
      return;
    }

    this.loadingSave = true;
    this.axisService.updateAxis(this.id, this.axisForm.value).subscribe({
      next: () => {
        this.notifier.notify('success', 'Eixo salvo com sucesso');
        this.loadingSave = false;
        this.router.navigate(['/admin/axes']);
      },
      error: (error) => {
        this.axisService.formErrorHandler(this.axisForm, error.error);
        this.loadingSave = false;
      },
    });
  }
}
