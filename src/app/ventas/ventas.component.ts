import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentasService } from '../services/ventas.service';
import { ClientesService } from '../services/clientes.service';
import { ProductosService } from '../services/productos.service';

interface DetalleVenta {
  id?: number;
  fecha_hora?: string;
  cliente_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  total: number;
}

interface Cliente {
  id?: number;
  nombre: string;
}

interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  proveedor_id: number;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class VentasComponent implements OnInit {
  ventas: DetalleVenta[] = [];
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  showAddVentaForm = false;
  newVenta: DetalleVenta = { cliente_id: 0, producto_id: 0, cantidad: 0, precio_unitario: 0, total: 0 };
  selectedProductoId: number | null = null;
  cantidadDisponible: number | null = null;
  invoicePath = '';
  selectedVenta: DetalleVenta | null = null;

  constructor(
    private ventasService: VentasService,
    private clientesService: ClientesService,
    private productosService: ProductosService
  ) { }

  ngOnInit() {
    this.fetchVentas();
    this.fetchClientes();
    this.fetchProductos();
  }

  fetchVentas() {
    this.ventasService.getDetalleVentas().subscribe((data: DetalleVenta[]) => {
      this.ventas = data;
    });
  }

  fetchClientes() {
    this.clientesService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  fetchProductos() {
    this.productosService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  onProductoChange(event: any) {
    const selectedProducto = this.productos.find(p => p.id === +event.target.value);
    if (selectedProducto) {
      this.newVenta.producto_id = selectedProducto.id ?? 0;
      this.newVenta.precio_unitario = selectedProducto.precio ?? 0;
      this.cantidadDisponible = selectedProducto.cantidad ?? 0;
      this.updateTotal(); // Actualizar el total cuando se cambia el producto
    }
  }

  updateTotal() {
    if (this.newVenta.cantidad > 0 && this.newVenta.precio_unitario > 0) {
      this.newVenta.total = this.newVenta.cantidad * this.newVenta.precio_unitario;
    } else {
      this.newVenta.total = 0;
    }
  }

  saveVenta() {
    this.updateTotal(); // Asegurarse de que el total esté actualizado
    const fechaHoraActual = new Date().toISOString();
    this.newVenta.fecha_hora = fechaHoraActual;

    this.ventasService.addDetalleVenta(this.newVenta).subscribe((venta: DetalleVenta) => {
      this.ventas.push(venta);

      // Restar la cantidad vendida del inventario y actualizar el producto en la base de datos
      const producto = this.productos.find(p => p.id === this.newVenta.producto_id);
      if (producto) {
        producto.cantidad -= this.newVenta.cantidad;
        this.productosService.updateProducto(producto).subscribe(() => {
          this.fetchProductos(); // Actualizar la lista de productos después de la venta
        });
      }

      this.resetForm();
    });
  }

  deleteVenta(venta: DetalleVenta) {
    this.ventasService.deleteDetalleVenta(venta.id!).subscribe(() => {
      this.fetchVentas();
    });
  }

  generateReport(venta: DetalleVenta) {
    this.selectedVenta = venta; // Guardar la venta seleccionada para la vista previa
    this.ventasService.generateInvoice(venta.id!).subscribe((response: any) => {
      this.invoicePath = response.pdfPath;
      // Añadir un log para verificar la ruta
      console.log('Invoice path set to:', this.invoicePath);
    });
  }

  openInvoice() {
    if (this.invoicePath) {
      // Asegurarse de que la ruta del archivo PDF es correcta
      const fullPath = `http://localhost:3000${this.invoicePath}`;
      console.log('Opening invoice at:', fullPath); // Añadir un log para verificar la URL
      window.open(fullPath, '_blank'); // Abrir la factura en una nueva pestaña
    }
  }

  resetForm() {
    this.newVenta = { cliente_id: 0, producto_id: 0, cantidad: 0, precio_unitario: 0, total: 0 };
    this.cantidadDisponible = null;
    this.selectedProductoId = null;
    this.showAddVentaForm = false;
  }

  getNombreCliente(cliente_id: number): string {
    const cliente = this.clientes.find(c => c.id === cliente_id);
    return cliente ? cliente.nombre : 'Desconocido';
  }

  getNombreProducto(producto_id: number): string {
    const producto = this.productos.find(p => p.id === producto_id);
    return producto ? producto.nombre : 'Desconocido';
  }
}
