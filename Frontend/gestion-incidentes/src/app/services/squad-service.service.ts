import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Squad } from '../dtos/SquadDto.dto';
import { SquadRequest } from '../dtos/SquadRequestDto.dto';
import { SupervisorDto } from '../dtos/SupervisorDto.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SquadServiceService {
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
  createSquad(request: SquadRequest) {
    return this.http.post<Squad>(`${this.baseUrl}/admin/squad`, request, this.authHeaders());
  }
  getSquads() {
    return this.http.get<Squad[]>(`${this.baseUrl}/admin/squads`, this.authHeaders());
  }

  updateSquad(id: number, body: Partial<Squad>) {
    return this.http.put<Squad>(`${this.baseUrl}/admin/squad/${id}`, body, this.authHeaders());
  }

  deleteSquad(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/admin/squad/${id}/delete`, this.authHeaders());
  }

  getSupervisors() {
    return this.http.get<SupervisorDto[]>(
      `${environment.apiUrl}/api/users/internal/supervisors`,
      this.authHeaders()
    );
  }

    getSquadsForSupervisor(): Observable<Squad[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Squad[]>(`${this.baseUrlForSquad}/api/squad/reports/supervisor`, { headers });
  }
}