import { Component } from '@angular/core';
import { SaleService } from '../services/sale.service';
import { Sale } from '../models/sale';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  imports: [FormsModule,CommonModule]
})
export class SalesComponent {
  sales: Sale[] = [];
  selectedSale: Sale | null = null;
  invoicePath = '';

  constructor(private saleService: SaleService) {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSales().subscribe((data: Sale[]) => {
      this.sales = data;
    });
  }

  generateInvoice(sale: Sale) {
    this.saleService.generateInvoice(sale.id).subscribe((response: any) => {
      this.invoicePath = response.pdfPath;
      window.open(this.invoicePath, '_blank'); // Abrir la factura en una nueva pestaña
    });
  }
}
