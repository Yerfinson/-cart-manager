import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(ProductService);

  editProduct = output<Product>();

  products = this.productService.getProducts();

  addToCart(product: Product): void {
    this.productService.addToCart(product);
  }

  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }
}
