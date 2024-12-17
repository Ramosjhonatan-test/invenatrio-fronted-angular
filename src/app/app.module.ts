import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ClientesComponent } from './clientes/clientes.component'; 
import { ProveedoresComponent } from './proveedores/proveedores.component';


@NgModule({
  declarations: [
    
    // Aquí puedes declarar otros componentes si es necesario
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: []
  // No necesitamos 'bootstrap' aquí
})
export class AppModule { }
