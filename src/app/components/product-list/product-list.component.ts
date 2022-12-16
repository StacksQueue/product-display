import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { ProductService } from '../../services/product.service';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );
  }

  getProducts() {
    this.productService.getProducts(this.pagination).subscribe((resp) => {
      this.productlist = resp['products'];
      console.log(this.productlist);
    });
  }

  paginate(event: PageEvent) {
    console.log(event);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
        opened: this.opened
      },
    };
    this.router.navigate(['/'], navigationExtras);
  }

  cartClicked() {
    console.log('cart clicked');
    this.productService.cartSubject.next('nice');
  }

  queryParamsHandler(params: Params) {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
    this.pagination.limit = params['limit'] ? params['limit'] : 10;
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.getProducts();
  }
}
