import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/Products';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | any;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  addProductToCart() {
    this.productService.productSubject.next(this.product);
  }

  viewProductDetail() {
    console.log('view');
    this.dialog.open(ProductDetailComponent, {
      data: this.product,
      height: '70vh',
      width: '80vw',
    });
  }
}
