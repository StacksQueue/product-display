import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/Pagination';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 10,
    pageSizeOption: [5, 10, 25, 100],
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  paginate(event: PageEvent) {
    console.log(event);
  }

  cartClicked() {
    console.log('cart clicked');
    this.productService.cartSubject.next('nice');
  }
}
