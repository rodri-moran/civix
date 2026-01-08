import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../dtos/UserDto.dto';
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserDto> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<UserDto>(`${this.apiUrl}/me`, { headers });
  }
  updateProfile(data: UserDto): Observable<UserDto> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<UserDto>(`${this.apiUrl}/me`, data, { headers });
  }
}