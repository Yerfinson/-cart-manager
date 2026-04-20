import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AlertService } from './alert';
import Swal from 'sweetalert2';

describe('AlertService', () => {
  let service: AlertService;
  let swalSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
    swalSpy = vi.spyOn(Swal, 'fire').mockResolvedValue({
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
      value: true,
    } as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('confirmDelete', () => {
    it('should return true when user confirms', async () => {
      const result = await service.confirmDelete('Laptop Pro');
      expect(result).toBe(true);
      expect(swalSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Delete product?',
          icon: 'warning',
          showCancelButton: true,
        })
      );
    });

    it('should return false when user cancels', async () => {
      swalSpy.mockResolvedValueOnce({
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
        value: undefined,
      } as never);
      const result = await service.confirmDelete('Laptop Pro');
      expect(result).toBe(false);
    });
  });

  describe('success', () => {
    it('should call Swal.fire with success icon and toast config', () => {
      service.success('Product added!');
      expect(swalSpy).toHaveBeenCalledWith(
        expect.objectContaining({ icon: 'success', toast: true, title: 'Product added!' })
      );
    });
  });

  describe('error', () => {
    it('should call Swal.fire with error icon and toast config', () => {
      service.error('Something went wrong');
      expect(swalSpy).toHaveBeenCalledWith(
        expect.objectContaining({ icon: 'error', toast: true, title: 'Something went wrong' })
      );
    });
  });

  describe('info', () => {
    it('should call Swal.fire with info icon and toast config', () => {
      service.info('Item removed from cart');
      expect(swalSpy).toHaveBeenCalledWith(
        expect.objectContaining({ icon: 'info', toast: true, title: 'Item removed from cart' })
      );
    });
  });
});
