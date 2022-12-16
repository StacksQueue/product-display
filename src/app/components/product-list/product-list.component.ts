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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 100],
  };
  opened: boolean = true;
  searchedWord = new FormControl('');
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
    const searchword = this.searchedWord.value ? this.searchedWord.value : '';
    this.productService
      .getProducts(this.pagination, searchword)
      .subscribe((resp) => {
        if (resp && resp['success']) {
          this.productlist = resp['data'];
          this.pagination.length = resp['total'];
        }
      });
  }

  searchProduct(event: Event) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: this.pagination.page,
        limit: this.pagination.limit,
        opened: this.opened,
        search: this.searchedWord.value,
      },
    };
    this.router.navigate(['/'], navigationExtras);
  }
  paginate(event: PageEvent) {
    console.log(event);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
        opened: this.opened,
        search: this.searchedWord.value,
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
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.pagination.page = params['page'] ? params['page'] : 1;
    const searchword = params['search'] ? params['search'] : '';
    this.searchedWord.patchValue(searchword);
    this.getProducts();
  }
}
