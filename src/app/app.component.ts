import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private theme: ThemeService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.theme.loadCurrentTheme();
    this.matDialog.open(ConfirmModalComponent, {
      data: {
        title: 'Título',
        message: 'Mensagem',
      },
    });
  }
}
