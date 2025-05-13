import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export default class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal<string>('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id)
        .subscribe({
          next: (product: Product) => {
            this.product.set(product);
            if (product && product.images && product.images.length > 0) {
              this.cover.set(product.images[0]);
            }
          },
          error: () => {}
        })
    }
  }

  changeCover(imgUrl: string) {
    this.cover.set(imgUrl);
  }

  addToCart() {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p);
    }
  }

}
