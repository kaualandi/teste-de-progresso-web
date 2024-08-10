import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '@app/models/home';
import { QuestionFilter } from '@app/models/question';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpService) {}

  getDashboard(filters?: QuestionFilter) {
    let query = new HttpParams();
    if (filters) {
      query = query
        .append('start_year', filters.start_year)
        .append('end_year', filters.end_year)
        .append('authorship', filters.authorship.join(','))
        .append('subjects', filters.subjects.join(','));
    }

    return this.http.get<Dashboard>('/dashboard/', query);
  }
}
