import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente'; // Importar la interfaz Cliente

@Injectable({
  providedIn: 'root'
})
export class TopClientesService {
  private apiUrl = 'http://localhost:3000/api/clientes/top';

  constructor(private http: HttpClient) { }

  getTopClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
}
