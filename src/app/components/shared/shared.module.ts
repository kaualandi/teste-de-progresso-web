import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { IconDirective } from 'src/app/directives/icon.directive';
import { InitialLettersDirective } from 'src/app/directives/initial-letters.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { PrevPageDirective } from '../../directives/prev-page.directive';
import { StopPropagDirective } from '../../directives/stop-propag.directive';
import { FilterDataPipe } from '../../pipes/filter-data.pipe';
import { FormErrorPipe } from '../../pipes/form-error.pipe';
import { SafePipe } from '../../pipes/safe.pipe';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LangSelectComponent } from './lang-select/lang-select.component';
import { LoadingComponent } from './loading/loading.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PasswordStregthComponent } from './password-stregth/password-stregth.component';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';

const IMPORTS = [
  MatButtonModule,
  NgxMaskDirective,
  NgxMaskPipe,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
];

const DECLARATIONS = [
  LoadingComponent,
  PageLoadingComponent,
  PaginationComponent,
  IconDirective,
  InputFileDirective,
  InitialLettersDirective,
  ConfirmModalComponent,
  SkeletonLoadingComponent,
  SafePipe,
  AvatarComponent,
  PrevPageDirective,
  PasswordStregthComponent,
  StopPropagDirective,
  LangSelectComponent,
  PageErrorComponent,
  FilterDataPipe,
  FormErrorPipe,
];

@NgModule({
  imports: [
    ...IMPORTS,
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  declarations: [...DECLARATIONS],
  exports: [...IMPORTS, ...DECLARATIONS],
})
export class SharedModule {}
