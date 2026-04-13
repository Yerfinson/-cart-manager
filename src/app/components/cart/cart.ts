import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { AlertService } from '../../services/alert';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private productService = inject(ProductService);
  private alertService = inject(AlertService);

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

  removeItem(productId: number, name: string): void {
    this.productService.removeFromCart(productId);
    this.alertService.info(`"${name}" removed from cart`);
  }

  async clearCart(): Promise<void> {
    const { default: Swal } = await import('sweetalert2');
    const result = await Swal.fire({
      title: 'Clear cart?',
      text: 'All items will be removed.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#212529',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Clear it',
    });
    if (result.isConfirmed) {
      this.cartItems().forEach(item => this.productService.removeFromCart(item.product.id));
      this.alertService.success('Cart cleared');
    }
  }
}
