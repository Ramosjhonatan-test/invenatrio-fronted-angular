import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>('/api/sales');
  }

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>('/api/sales', sale);
  }

  getSaleDetails(saleId: number): Observable<Sale> {
    return this.http.get<Sale>(`/api/sales/${saleId}`);
  }

  generateInvoice(saleId: number): Observable<{ pdfPath: string }> {
    return this.http.post<{ pdfPath: string }>(`/api/sales/${saleId}/generateInvoice`, {});
  }

  // Otros métodos para gestionar ventas
}
