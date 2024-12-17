import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';
import { RevenueChartComponent } from '../revenue-chart/revenue-chart.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    SalesChartComponent,
    RevenueChartComponent,
    NotificationsComponent
  ],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  totalVentas: number = 0;
  totalIngresos: number = 0;

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.fetchVentasIngresos();
  }

  fetchVentasIngresos(): void {
    this.reporteService.getVentasIngresos().subscribe((data: any) => {
      this.totalVentas = data[0].totalVentas;
      this.totalIngresos = data[0].totalIngresos;
    });
  }
}
