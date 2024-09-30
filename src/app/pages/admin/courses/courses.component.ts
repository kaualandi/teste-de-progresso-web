import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { CreateCourseComponent } from '@app/components/modals/create-course/create-course.component';
import { Course } from '@app/models/course';
import { CourseService } from '@app/services/course.service';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  courses: Course[] = [];
  displayedColumns = ['name', 'coordinator', 'pro_rector', 'actions'];

  filters = this.fb.nonNullable.group({
    search: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getCourses();

    this.filters.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.loadingTable = true;
        this.getCourses();
      });
  }

  getCourses() {
    this.error = 0;
    this.courseService.getCourses(this.filters.value).subscribe({
      next: (response) => {
        this.courses = response;
        this.loading = false;
        this.loadingTable = false;
      },
      error: (error) => {
        this.loading = false;
        this.loadingTable = false;
        this.error = error.status || 500;
      },
    });
  }

  handleDeleteCourseButton(course: Course) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir curso',
        message: `Tem certeza que deseja excluir ${course.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadingTable = true;
      this.deleteCourse(course.id);
    });
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.notifier.notify('success', 'Curso excluído com sucesso');
      this.getCourses();
    });
  }

  handleAddCourseButton() {
    this.dialog.open(CreateCourseComponent);
  }
}
