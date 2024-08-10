import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IconDirective } from '@directives/icon.directive';
import { InitialLettersDirective } from '@directives/initial-letters.directive';
import { InputFileDirective } from '@directives/input-file.directive';
import { PrevPageDirective } from '@directives/prev-page.directive';
import { ScrollToDirective } from '@directives/scroll-to.directive';
import { StopPropagDirective } from '@directives/stop-propag.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FilterDataPipe } from '@pipes/filter-data.pipe';
import { FormErrorPipe } from '@pipes/form-error.pipe';
import { SafePipe } from '@pipes/safe.pipe';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { BloomTaxonomyPipe } from '../../pipes/bloom-taxonomy.pipe';
import { DifficultyPipe } from '../../pipes/dificulty.pipe';
import { PlaintextPipe } from '../../pipes/plaintext.pipe';
import { ReviewStatusPipe } from '../../pipes/review-status.pipe';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ForgotPasswordComponent } from '../modals/forgot-password/forgot-password.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LangSelectComponent } from './lang-select/lang-select.component';
import { LoadingComponent } from './loading/loading.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PasswordStregthComponent } from './password-stregth/password-stregth.component';
import { QuestionsFilterComponent } from './questions-filter/questions-filter.component';
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
  ScrollToDirective,
  ForgotPasswordComponent,
  DifficultyPipe,
  PlaintextPipe,
  BloomTaxonomyPipe,
  ReviewStatusPipe,
  QuestionsFilterComponent,
];

@NgModule({
  imports: [
    ...IMPORTS,
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  declarations: [...DECLARATIONS],
  exports: [...IMPORTS, ...DECLARATIONS],
  providers: [TranslateService],
})
export class SharedModule {}
