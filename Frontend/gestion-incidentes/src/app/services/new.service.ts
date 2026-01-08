import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewDto } from '../dtos/NewDto.dto';
import { Observable } from 'rxjs';
import { NewResponseDto } from '../dtos/NewResponseDto.dto';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NewService {
  private baseUrl = `${environment.apiUrl}/api/report`

constructor(private http: HttpClient, ) { }

  private authHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createNew(dto: NewDto): Observable<NewDto>{
    return this.http.post<NewDto>(
      `${this.baseUrl}/admin`,
      dto,
      this.authHeaders()
    )
  }

  getAllNews() : Observable<NewResponseDto[]>{
    return this.http.get<NewResponseDto[]>(
      `${this.baseUrl}/public`
    )
  }

  deleteNew(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/api/new/admin/delete/${id}`,
      this.authHeaders()
    )
  }
}