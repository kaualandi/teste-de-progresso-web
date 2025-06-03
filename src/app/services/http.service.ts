import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '@env';
import { StorageService } from '@services/storage.service';
import { NotifierService } from 'angular-notifier';
import { catchError, retry, throwError } from 'rxjs';

import { LanguageService } from './language.service';
import { ObjectService } from './object.service';

export interface BodyJson {
  [key: string]: unknown;
}

export interface HttpConfig {
  token: boolean;
}

export interface HttpError {
  [key: string]: string | string[];
}

type ApplicationsTypes = 'json' | 'x-www-form-urlencoded';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private notifier: NotifierService,
    private objectService: ObjectService,
    private language: LanguageService
  ) {}

  public base_url = environment.base_url;
  private repeat = 1;

  private getBodyType(body: BodyJson | HttpParams): ApplicationsTypes {
    if (!(body instanceof HttpParams)) {
      this.objectService.removeEmptyValues(body);
    }
    return body instanceof HttpParams ? 'x-www-form-urlencoded' : 'json';
  }

  private getUrl(url: string) {
    if (url.includes('http')) return url;
    return this.base_url + url;
  }

  private getHeaders(
    application: ApplicationsTypes = 'json',
    config: HttpConfig
  ) {
    const headers = {
      'Content-Type': `application/${application}`,
      'Accept-Language': this.language.current,
      Authorization: '',
    };
    if (this.storage.token && config.token) {
      headers.Authorization = 'token ' + this.storage.token;
    }

    return headers;
  }

  private handleError = (error: HttpErrorResponse) => {
    const status = (error.status || 500) + '';
    if (status.startsWith('5')) {
      this.notifier.notify('error', 'Erro interno no servidor');
      return throwError(() => error);
    }

    const nonFieldErrors = error.error.non_field_errors;
    if (Object.keys(error.error).length) {
      if (nonFieldErrors) {
        nonFieldErrors.forEach((error: string) => {
          this.notifier.notify('error', error);
        });
      }
      if (error.error.detail) {
        this.notifier.notify('error', error.error.detail);
      }
      return throwError(() => error);
    }

    this.notifier.notify('error', 'Não foi possível completar a ação');
    return throwError(() => error);
  };

  private validateConfig(config?: HttpConfig) {
    if (!config) config = {} as HttpConfig;
    if (typeof config.token !== 'boolean') config.token = true;
    return config;
  }

  /**
   * ### Método GET
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  get<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.validateConfig(config);
    const headers = this.getHeaders('json', config);
    return this.http
      .get<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método POST
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  post<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.validateConfig(config);
    const headers = this.getHeaders(application, config);
    const _body = application === 'json' ? JSON.stringify(body) : body;

    return this.http
      .post<T>(this.getUrl(url), _body, {
        headers,
        params,
      })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método PATCH
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  patch<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.validateConfig(config);
    const headers = this.getHeaders(application, config);
    const _body = application === 'json' ? JSON.stringify(body) : body;

    return this.http
      .patch<T>(this.getUrl(url), _body, { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método DELETE
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  delete<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.validateConfig(config);
    const headers = this.getHeaders('json', config);
    return this.http
      .delete<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Tratamento de erro para formulários
   * Espera receber um formulario do tipo FormGroup e um erro da requisição.
   * O erro é tratado e os campos do formulario são marcados como inválidos.
   *
   * Não se preocupe se o campo não existir, o erro será ignorado.
   * Tabém tratamos caso o formato dos erros seja diferente do esperado.
   *
   * @param form Formulário do tipo FormGroup
   * @param error Erro da requisição
   */
  formErrorHandler(form: FormGroup, errors: HttpError) {
    if (!errors) return;
    for (const key in errors) {
      if (form.get(key)) {
        const value = errors[key];
        if (typeof value === 'string') {
          form.get(key)?.setErrors({ server: value });
        } else if (value.length) {
          form.get(key)?.setErrors({ server: value[0] });
        }
      }
    }
  }
}
