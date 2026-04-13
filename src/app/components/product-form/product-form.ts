import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { AlertService } from '../../services/alert';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnChanges {
  private productService = inject(ProductService);
  private alertService = inject(AlertService);

  productToEdit = input<Product | null>(null);
  formClosed = output<void>();

  formData: Omit<Product, 'id'> = this.emptyForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit']) {
      const p = this.productToEdit();
      this.formData = p ? { ...p } : this.emptyForm();
    }
  }

  onSubmit(): void {
    const p = this.productToEdit();
    if (p) {
      this.productService.updateProduct({ ...this.formData, id: p.id });
      this.alertService.success(`"${this.formData.name}" updated successfully`);
    } else {
      this.productService.addProduct(this.formData);
      this.alertService.success(`"${this.formData.name}" added successfully`);
    }
    this.reset();
  }

  onCancel(): void {
    this.reset();
  }

  private reset(): void {
    this.formData = this.emptyForm();
    this.formClosed.emit();
  }

  private emptyForm(): Omit<Product, 'id'> {
    return { name: '', description: '', price: 0, stock: 0, category: '' };
  }
}
