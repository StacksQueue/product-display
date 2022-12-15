import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { ProductService } from '../services/product.service';
import { Product } from 'src/app/models/Products';

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
  opened: boolean = true;
  productlist: any = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );

    this.productService.getProducts().subscribe((resp) => {
      this.productlist = resp['products']
      console.log(this.productlist)
    });
  }

  paginate(event: PageEvent) {
    console.log(event);
  }

  cartClicked() {
    console.log('cart clicked');
    this.productService.cartSubject.next('nice');
  }

  queryParamsHandler(params: Params) {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
  }
}
