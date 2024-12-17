import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Asegúrate de que todos los componentes estén importados 
import { SalesChartComponent } from './app/sales-chart/sales-chart.component'; 
import { RevenueChartComponent } from './app/revenue-chart/revenue-chart.component'; 
import { NotificationsComponent } from './app/notifications/notifications.component'; 
import { ReportesComponent } from './app/reportes/reportes.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, CommonModule),
    // Asegúrate de incluir los componentes aquí 
    SalesChartComponent, RevenueChartComponent,  NotificationsComponent, ReportesComponent
  ]
}).catch(err => console.error(err));
