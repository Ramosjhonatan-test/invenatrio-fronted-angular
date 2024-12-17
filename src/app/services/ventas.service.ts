import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DetalleVenta {
  id?: number;
  fecha_hora?: string;
  cliente_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private detalleVentaUrl = 'http://localhost:3000/api/detalle_venta';

  constructor(private http: HttpClient) { }

  getDetalleVentas(): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(this.detalleVentaUrl);
  }

  addDetalleVenta(detalleVenta: DetalleVenta): Observable<DetalleVenta> {
    return this.http.post<DetalleVenta>(this.detalleVentaUrl, detalleVenta);
  }

  updateDetalleVenta(detalleVenta: DetalleVenta): Observable<DetalleVenta> {
    return this.http.put<DetalleVenta>(`${this.detalleVentaUrl}/${detalleVenta.id}`, detalleVenta);
  }

  deleteDetalleVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.detalleVentaUrl}/${id}`);
  }

  generateInvoice(id: number): Observable<{ pdfPath: string }> {
    return this.http.post<{ pdfPath: string }>(`${this.detalleVentaUrl}/${id}/generateInvoice`, {});
  }
}
