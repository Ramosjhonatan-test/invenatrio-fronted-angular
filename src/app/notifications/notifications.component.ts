import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [CommonModule]
})
export class NotificationsComponent implements OnInit {
  productosBajoStock: Producto[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.fetchProductosBajoStock();
  }

  fetchProductosBajoStock(): void {
    this.stockService.getProductosBajoStock().subscribe((productos: Producto[]) => {
      this.productosBajoStock = productos.filter(producto => producto.cantidad <= 50);
    });
  }
}
