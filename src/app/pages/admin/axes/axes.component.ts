import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { CreateAxisComponent } from '@app/components/modals/create-axis/create-axis.component';
import { SubjectAxis } from '@app/models/subject';
import { AxisService } from '@app/services/axis.service';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-axes',
  templateUrl: './axes.component.html',
  styleUrls: ['./axes.component.scss'],
})
export class AxesComponent implements OnInit {
  constructor(
    private axisService: AxisService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  axes: SubjectAxis[] = [];
  displayedColumns = ['name', 'updated_at', 'created_at', 'actions'];

  filters = this.fb.nonNullable.group({
    search: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getAxes();

    this.filters.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.loadingTable = true;
        this.getAxes();
      });
  }

  getAxes() {
    this.error = 0;
    this.axisService.getAxes(this.filters.value).subscribe({
      next: (response) => {
        this.axes = response;
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

  handleDeleteAxisButton(axis: SubjectAxis) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir eixo',
        message: `Tem certeza que deseja excluir ${axis.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadingTable = true;
      this.deleteAxis(axis.id);
    });
  }

  deleteAxis(id: number) {
    this.axisService.deleteAxis(id).subscribe({
      next: () => {
        this.notifier.notify('success', 'Eixo excluído com sucesso');
        this.getAxes();
      },
      error: () => {
        this.loadingTable = false;
      },
    });
  }

  handleAddAxisButton() {
    this.dialog.open(CreateAxisComponent);
  }
}
