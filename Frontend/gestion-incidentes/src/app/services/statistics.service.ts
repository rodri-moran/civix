import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/api/report/public/statistics/reports/by-status`;

  getCountOfReportsByStatus(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.apiUrl);
  }
  getCountOfReportsBySquad(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${environment.apiUrl}/api/report/public/statistics/reports/by-squad`);
  }
  getTotalReports(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/api/report/public/statistics/reports`);
  }
  getAverageResolutionTime(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/api/report/public/statistics/time/resolution`);
  }
  getAverageResolutionTimeBySquad(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${environment.apiUrl}/api/report/public/statistics/time/resolution/by-squad`);
  }
}