import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../services/configuracion.service';
import { AuthService } from '../auth.service';


interface Configuracion {
  id?: number;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConfiguracionComponent implements OnInit {
  configuracion: Configuracion = { nombre: '', nit: '', direccion: '', telefono: '', correo: '' };
  usuario: string | null = ''; // Aquí se almacenará el nombre del usuario autenticado

  constructor(private configuracionService: ConfiguracionService, private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.getUsuario(); // Obtener el nombre del usuario autenticado
    this.fetchConfiguracion();
  }

  fetchConfiguracion() {
    this.configuracionService.getConfiguracion().subscribe((data: Configuracion[]) => {
      if (data.length > 0) {
        this.configuracion = data[0];
      }
    });
  }

  saveConfiguracion() {
    if (this.configuracion.id) {
      this.configuracionService.updateConfiguracion(this.configuracion.id, this.configuracion).subscribe(() => {
        this.fetchConfiguracion();
      });
    } else {
      this.configuracionService.addConfiguracion(this.configuracion).subscribe(() => {
        this.fetchConfiguracion();
      });
    }
  }
}
