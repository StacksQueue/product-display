import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/models/Products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {}

  onGalleryOpen() {}

  onGalleryClose() {}

  addProductToCart() {
    this.productService.productSubject.next(this.data)
  }
}
