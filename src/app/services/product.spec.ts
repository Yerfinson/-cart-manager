import { TestBed } from '@angular/core/testing';
import { ProductService } from './product';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return initial 3 products', () => {
      expect(service.getProducts()().length).toBe(3);
    });
  });

  describe('addProduct', () => {
    it('should add a new product with auto-incremented id', () => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'Monitor',
        description: '4K Monitor',
        price: 399.99,
        stock: 15,
        category: 'Electronics',
      };
      service.addProduct(newProduct);
      const products = service.getProducts()();
      expect(products.length).toBe(4);
      expect(products[3].name).toBe('Monitor');
      expect(products[3].id).toBe(4);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product by id', () => {
      const updated: Product = {
        id: 1,
        name: 'Laptop Pro Max',
        description: 'Updated laptop',
        price: 1499.99,
        stock: 5,
        category: 'Electronics',
      };
      service.updateProduct(updated);
      const products = service.getProducts()();
      expect(products.find(p => p.id === 1)?.name).toBe('Laptop Pro Max');
    });

    it('should also update the product in the cart when updated', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      const updated = { ...product, name: 'Updated Laptop' };
      service.updateProduct(updated);
      const cartItem = service
        .getCart()()
        .find(i => i.product.id === product.id);
      expect(cartItem?.product.name).toBe('Updated Laptop');
    });
  });

  describe('deleteProduct', () => {
    it('should remove a product by id', () => {
      service.deleteProduct(1);
      const products = service.getProducts()();
      expect(products.length).toBe(2);
      expect(products.find(p => p.id === 1)).toBeUndefined();
    });

    it('should also remove the product from cart when deleted', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      service.deleteProduct(product.id);
      expect(
        service
          .getCart()()
          .find(i => i.product.id === product.id)
      ).toBeUndefined();
    });
  });

  describe('addToCart', () => {
    it('should add a product to cart with quantity 1', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      expect(service.getCart()().length).toBe(1);
      expect(service.getCart()()[0].quantity).toBe(1);
    });

    it('should increment quantity if product already in cart', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      service.addToCart(product);
      expect(service.getCart()().length).toBe(1);
      expect(service.getCart()()[0].quantity).toBe(2);
    });
  });

  describe('removeFromCart', () => {
    it('should remove an item from cart', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      service.removeFromCart(product.id);
      expect(service.getCart()().length).toBe(0);
    });
  });

  describe('updateCartQuantity', () => {
    it('should update quantity of a cart item', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      service.updateCartQuantity(product.id, 5);
      expect(service.getCart()()[0].quantity).toBe(5);
    });

    it('should remove item from cart when quantity is set to 0', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      service.updateCartQuantity(product.id, 0);
      expect(service.getCart()().length).toBe(0);
    });

    it('should remove item from cart when quantity is negative', () => {
      const product = service.getProducts()()[0];
      service.addToCart(product);
      service.updateCartQuantity(product.id, -1);
      expect(service.getCart()().length).toBe(0);
    });
  });

  describe('getCartTotal', () => {
    it('should return 0 for empty cart', () => {
      expect(service.getCartTotal()).toBe(0);
    });

    it('should return correct total for multiple cart items', () => {
      const products = service.getProducts()();
      service.addToCart(products[0]); // 1299.99
      service.addToCart(products[1]); // 29.99
      service.addToCart(products[1]); // 29.99 (qty 2)
      const expected = 1299.99 + 29.99 * 2;
      expect(service.getCartTotal()).toBeCloseTo(expected, 2);
    });
  });

  describe('getCartCount', () => {
    it('should return 0 for empty cart', () => {
      expect(service.getCartCount()).toBe(0);
    });

    it('should return total item count across all cart items', () => {
      const products = service.getProducts()();
      service.addToCart(products[0]);
      service.addToCart(products[1]);
      service.addToCart(products[1]);
      expect(service.getCartCount()).toBe(3);
    });
  });
});
