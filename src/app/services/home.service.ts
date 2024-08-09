import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

interface DashFilters {
  start_year: moment.Moment;
  end_year: moment.Moment;
  authorship: string[];
  subjects: number[];
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpService) {}

  getDashboard(filters: DashFilters) {
    const query = new HttpParams()
      .append('start_year', filters.start_year.format('YYYY'))
      .append('end_year', filters.end_year.format('YYYY'))
      .append('authorship', filters.authorship.join(','))
      .append('subjects', filters.subjects.join(','));
    return this.http.get('/dashboard', query);
  }
}
