import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from './components/product-list/product-list';
import { ProductForm } from './components/product-form/product-form';
import { Cart } from './components/cart/cart';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductList, ProductForm, Cart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  showForm = signal(false);
  productToEdit = signal<Product | null>(null);
  activeTab = signal<'products' | 'cart'>('products');

  onEditProduct(product: Product): void {
    this.productToEdit.set(product);
    this.showForm.set(true);
  }

  onAddNew(): void {
    this.productToEdit.set(null);
    this.showForm.set(true);
  }

  onFormClosed(): void {
    this.showForm.set(false);
    this.productToEdit.set(null);
  }
}
