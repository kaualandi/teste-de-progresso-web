import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Score, zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnBrPackage from '@zxcvbn-ts/language-pt-br';
import { NotifierService } from 'angular-notifier';
import { zoomInAnimation } from 'src/app/animations/route-animation';
import { Genre } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BodyJson } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { cpfValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [zoomInAnimation],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public storage: StorageService,
    private authService: AuthService,
    public router: Router,
    private notifier: NotifierService
  ) {}

  loading = false;
  view_pass = false;
  view_repass = false;
  score: Score = 0;
  now = new Date();
  password_warning = '';
  password_suggestions: string[] = [];

  register_form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    birth_date: [this.now, [Validators.required]],
    cpf: ['', [Validators.required, cpfValidator]],
    genre: [new FormControl<Genre>('M'), [Validators.required]],
    password: ['', [Validators.required, this.validScore()]],
    re_password: ['', [Validators.required, this.samePassword()]],
  });

  ngOnInit(): void {
    this.register_form.get('birth_date')?.reset();

    this.register_form.get('password')?.valueChanges.subscribe((value) => {
      this.strengthPassword(value || '');
    });
  }

  loginSubmitHandler() {
    if (this.register_form.invalid) {
      this.register_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.register(this.register_form.value as BodyJson).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
        this.notifier.notify('success', 'Registrado com sucesso!');
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  samePassword() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (password !== this.register_form.value.password) {
          return { diff_password: true };
        }
      }
      return null;
    };
  }

  validScore() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (this?.score < 3) {
          return { poor_password: true };
        }
      }
      return null;
    };
  }

  get password() {
    return this.register_form.get('password')?.value as string;
  }

  strengthPassword(password: string) {
    const options = {
      translations: zxcvbnBrPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnBrPackage.dictionary,
      },
    };
    zxcvbnOptions.setOptions(options);
    const passwordStatus = zxcvbn(password);
    this.password_warning = passwordStatus.feedback.warning || '';
    this.password_suggestions = passwordStatus.feedback.suggestions;
  }
}
