import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de tu backend
  private usuario: string | null = null;

  constructor(private http: HttpClient) { }

  register(name: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, phone, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.user && response.user.name) {
          this.usuario = response.user.name; // Guardar el nombre del usuario
        }
      })
    );
  }

  logout() {
    this.usuario = null;
    console.log('User logged out');
  }

  getUsuario(): string | null {
    return this.usuario;
  }
}
