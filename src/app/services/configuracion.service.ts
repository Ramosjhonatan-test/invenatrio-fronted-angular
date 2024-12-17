import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Configuracion {
  id?: number;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private configuracionUrl = 'http://localhost:3000/api/configuracion';

  constructor(private http: HttpClient) { }

  getConfiguracion(): Observable<Configuracion[]> {
    return this.http.get<Configuracion[]>(this.configuracionUrl);
  }

  addConfiguracion(configuracion: Configuracion): Observable<Configuracion> {
    return this.http.post<Configuracion>(this.configuracionUrl, configuracion);
  }

  updateConfiguracion(id: number, configuracion: Configuracion): Observable<Configuracion> {
    return this.http.put<Configuracion>(`${this.configuracionUrl}/${id}`, configuracion);
  }

  deleteConfiguracion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configuracionUrl}/${id}`);
  }
}
