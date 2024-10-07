import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubjectAxis, SubjectCategory } from '@app/models/subject';
import { AxisService } from '@app/services/axis.service';
import { CategoryService } from '@app/services/category.service';
import { SubjectService } from '@app/services/subject.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
})
export class CreateSubjectComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CreateSubjectComponent>,
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private axisService: AxisService,
    private categoryService: CategoryService,
    private notifier: NotifierService,
    private router: Router
  ) {
    this.dialogRef.addPanelClass('dialog-sm');
  }

  loading = false;
  loadingAxes = false;
  loadingCategories = false;
  axes: SubjectAxis[] = [];
  categories: SubjectCategory[] = [];
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    axis: [0, [Validators.required]],
    category: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.getAxes();
    this.getCategories();
  }

  getAxes() {
    this.loadingAxes = true;
    this.axisService.getAxes().subscribe({
      next: (response) => {
        this.axes = response;
        this.loadingAxes = false;
      },
      error: () => {
        this.loadingAxes = false;
      },
    });
  }

  getCategories() {
    this.loadingCategories = true;
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.loadingCategories = false;
      },
      error: () => {
        this.loadingCategories = false;
      },
    });
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.subjectService.createSubject(this.form.value).subscribe({
      next: (response) => {
        this.notifier.notify('success', 'Assunto criado com sucesso');
        this.dialogRef.close(true);
        this.router.navigate(['/admin/subjects', response.id]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
