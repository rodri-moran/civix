import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { environment } from '../../environments/environment';
import { Squad } from '../dtos/SquadDto.dto';
import { ResponseDto } from '../dtos/ReportResponseDto.dto';
export interface Report {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  status: string;
  createdAt: string;
  squad?: Squad;
  imageUrl?: string;
}


@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  private baseUrl = `${environment.apiUrl}/api/report`;
  private baseUrlForSquad = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createReport(title: string, description: string, address: string, latitude: number, longitude: number, userId: number): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(`${this.baseUrl}/public`, { title, description, address, latitude, longitude, userId })           
  }

  getReportsByUserId(): Observable<Report[]>{
    return this.http.get<Report[]>(`${this.baseUrl}/get-by-user-id`, this.authHeaders());
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/admin/getAll`, this.authHeaders());
  }

  getSquads() {
    return this.http.get<Squad[]>(`${this.baseUrl}/admin/squads`, this.authHeaders());
  }

  findByStatus(status: string): Observable<Report[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Report[]>(`${this.baseUrl}/admin/report?status=` + status, { headers });
  }

  assignSquadToReport(reportId: number, squadId: number): Observable<Report> {
    console.log('reportId: ' + reportId + ' y squadId: ' + squadId);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Report>(
      `${this.baseUrl}/admin/report/${reportId}/assign/${squadId}`,
      {},
      { headers }
    );
  }

  updateStatus(reportId: number, status: String, resourcesUsed?: any): Observable<Report> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Report>(
      `${this.baseUrl}/status/${reportId}?status=${status}`,
      resourcesUsed ?? {},
      { headers }
    );
  }

  getReportsForSupervisor(): Observable<Report[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Report[]>(`${this.baseUrlForSquad}/api/squad/reports`, { headers });
  }
}
