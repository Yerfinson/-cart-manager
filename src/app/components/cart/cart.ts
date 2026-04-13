import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private productService = inject(ProductService);

  cartItems = this.productService.getCart();

  get total(): number {
    return this.productService.getCartTotal();
  }

  get itemCount(): number {
    return this.productService.getCartCount();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.productService.updateCartQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.productService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartItems().forEach(item => this.productService.removeFromCart(item.product.id));
  }
}
