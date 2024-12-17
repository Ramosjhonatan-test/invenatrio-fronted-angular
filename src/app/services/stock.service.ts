import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:3000/api/productos/bajo-stock';

  constructor(private http: HttpClient) { }

  getProductosBajoStock(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
