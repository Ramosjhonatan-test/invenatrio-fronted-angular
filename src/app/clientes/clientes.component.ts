import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';

interface Cliente {
  id?: number;
  nombre: string;
  correo: string;
  celular: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ClientesComponent implements OnInit {
  clients: Cliente[] = [];
  showAddClientForm = false;
  newClient: Cliente = { nombre: '', correo: '', celular: '' };
  editingClient: boolean = false;
  searchQuery = '';

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.fetchClientes();
  }

  fetchClientes() {
    this.clientesService.getClientes().subscribe((data: Cliente[]) => {
      this.clients = data;
    });
  }

  saveClient() {
    if (this.editingClient && this.newClient.id) {
      this.clientesService.updateCliente(this.newClient).subscribe((updatedClient: Cliente) => {
        this.clients = this.clients.map(client =>
          client.id === updatedClient.id ? updatedClient : client
        );
        this.resetForm();
      });
    } else {
      this.clientesService.addCliente(this.newClient).subscribe((cliente: Cliente) => {
        this.clients.push(cliente);
        this.resetForm();
      });
    }
  }

  startEditClient(client: Cliente) {
    this.newClient = { ...client };
    this.editingClient = true;
    this.showAddClientForm = true;
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteClient(client: Cliente) {
    this.clientesService.deleteCliente(client.id!).subscribe(() => {
      this.fetchClientes();
    });
  }

  buscarClientes() {
    this.clientesService.buscarClientes(this.searchQuery).subscribe((data: Cliente[]) => {
      this.clients = data;
    });
  }

  resetForm() {
    this.newClient = { nombre: '', correo: '', celular: '' };
    this.editingClient = false;
    this.showAddClientForm = false;
  }
}
