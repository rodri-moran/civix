import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  role?: string;
  sub?: string;
}   

interface AuthResponse {
  token: string;
  role: string;
  userId: number;
  name: string;
  lastName: string; 
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private apiRegisterUrl = 'http://localhost:8080/api/auth/register'
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password });
  }

  register(name: string, lastName: string, email: string, passwordHash: string, role: string){
    return this.http.post<AuthResponse>(this.apiRegisterUrl, {
      name,
      lastName,
      email,
      passwordHash,
      role    
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now().valueOf() / 1000;
      return decoded.exp < now;
    } catch (e) {
      return true;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token || this.isTokenExpired()) return null;

    const payload = jwtDecode<JwtPayload>(token);
    return payload.role || null;
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired()) return false;

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  
}