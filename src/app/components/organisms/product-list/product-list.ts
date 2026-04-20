import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product';
import { AlertService } from '../../../services/alert';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(ProductService);
  private alertService = inject(AlertService);

  editProduct = output<Product>();
  products = this.productService.getProducts();

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.alertService.success(`"${product.name}" added to cart`);
  }

  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }

  async onDelete(product: Product): Promise<void> {
    const confirmed = await this.alertService.confirmDelete(product.name);
    if (confirmed) {
      this.productService.deleteProduct(product.id);
      this.alertService.success(`"${product.name}" deleted`);
    }
  }
}
