import { Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private nextId = signal(4);

  private products = signal<Product[]>([
    { id: 1, name: 'Laptop Pro', description: 'High performance laptop', price: 1299.99, stock: 10, category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, stock: 50, category: 'Accessories' },
    { id: 3, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 89.99, stock: 30, category: 'Accessories' },
  ]);

  private cart = signal<CartItem[]>([]);

  getProducts() {
    return this.products;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = { ...product, id: this.nextId() };
    this.products.update(list => [...list, newProduct]);
    this.nextId.update(id => id + 1);
  }

  updateProduct(updated: Product): void {
    this.products.update(list =>
      list.map(p => (p.id === updated.id ? updated : p))
    );
    this.cart.update(items =>
      items.map(item =>
        item.product.id === updated.id ? { ...item, product: updated } : item
      )
    );
  }

  deleteProduct(id: number): void {
    this.products.update(list => list.filter(p => p.id !== id));
    this.cart.update(items => items.filter(item => item.product.id !== id));
  }

  addToCart(product: Product): void {
    const existing = this.cart().find(item => item.product.id === product.id);
    if (existing) {
      this.cart.update(items =>
        items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cart.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    this.cart.update(items => items.filter(item => item.product.id !== productId));
  }

  updateCartQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cart.update(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  getCartTotal() {
    return this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getCartCount() {
    return this.cart().reduce((count, item) => count + item.quantity, 0);
  }
}
