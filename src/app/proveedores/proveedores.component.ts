import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../services/Proveedores.service';

interface Proveedor {
  id?: number;
  nombre: string;
  contacto_nombre: string;
  contacto_celular: string;
  contacto_correo: string;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProveedoresComponent implements OnInit {
  providers: Proveedor[] = [];
  showAddProviderForm = false;
  newProvider: Proveedor = { nombre: '', contacto_nombre: '', contacto_celular: '', contacto_correo: '' };
  editingProvider: boolean = false;
  searchQuery = '';

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.fetchProveedores();
  }

  fetchProveedores() {
    this.proveedoresService.getProveedores().subscribe((data: Proveedor[]) => {
      this.providers = data;
    });
  }

  saveProvider() {
    if (this.editingProvider && this.newProvider.id) {
      this.proveedoresService.updateProveedor(this.newProvider).subscribe((updatedProvider: Proveedor) => {
        this.providers = this.providers.map(provider =>
          provider.id === updatedProvider.id ? updatedProvider : provider
        );
        this.resetForm();
      });
    } else {
      this.proveedoresService.addProveedor(this.newProvider).subscribe((proveedor: Proveedor) => {
        this.providers.push(proveedor);
        this.resetForm();
      });
    }
  }

  startEditProvider(provider: Proveedor) {
    this.newProvider = { ...provider };
    this.editingProvider = true;
    this.showAddProviderForm = true;
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteProvider(provider: Proveedor) {
    this.proveedoresService.deleteProveedor(provider.id!).subscribe(() => {
      this.fetchProveedores();
    });
  }

  buscarProveedores() {
    this.proveedoresService.buscarProveedores(this.searchQuery).subscribe((data: Proveedor[]) => {
      this.providers = data;
    });
  }

  resetForm() {
    this.newProvider = { nombre: '', contacto_nombre: '', contacto_celular: '', contacto_correo: '' };
    this.editingProvider = false;
    this.showAddProviderForm = false;
  }
}
