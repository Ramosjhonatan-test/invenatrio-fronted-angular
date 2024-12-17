import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../services/productos.service';
import { ProveedoresService } from '../services/Proveedores.service';

interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria: string;
  proveedor_id: number;
}

interface Proveedor {
  id?: number;
  nombre: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProductosComponent implements OnInit {
  products: Producto[] = [];
  proveedores: Proveedor[] = [];
  showAddProductForm = false;
  newProduct: Producto = { nombre: '', descripcion: '', precio: 0, cantidad: 0, categoria: '', proveedor_id: 0 };
  editingProduct: boolean = false;
  searchQuery = '';

  constructor(
    private productosService: ProductosService,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit() {
    this.fetchProductos();
    this.fetchProveedores();
  }

  fetchProductos() {
    this.productosService.getProductos().subscribe((data: Producto[]) => {
      this.products = data;
    });
  }

  fetchProveedores() {
    this.proveedoresService.getProveedores().subscribe((data: Proveedor[]) => {
      this.proveedores = data;
    });
  }

  saveProduct() {
    if (this.editingProduct && this.newProduct.id) {
      this.productosService.updateProducto(this.newProduct).subscribe((updatedProduct: Producto) => {
        this.products = this.products.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        this.resetForm();
      });
    } else {
      this.productosService.addProducto(this.newProduct).subscribe((producto: Producto) => {
        this.products.push(producto);
        this.resetForm();
      });
    }
  }

  startEditProduct(product: Producto) {
    this.newProduct = { ...product };
    this.editingProduct = true;
    this.showAddProductForm = true;
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteProduct(product: Producto) {
    this.productosService.deleteProducto(product.id!).subscribe(() => {
      this.fetchProductos();
    });
  }

  buscarProductos() {
    this.productosService.buscarProductos(this.searchQuery).subscribe((data: Producto[]) => {
      this.products = data;
    });
  }

  resetForm() {
    this.newProduct = { nombre: '', descripcion: '', precio: 0, cantidad: 0, categoria: '', proveedor_id: 0 };
    this.editingProduct = false;
    this.showAddProductForm = false;
  }
}
