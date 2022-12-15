import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-added-product-list',
  templateUrl: './added-product-list.component.html',
  styleUrls: ['./added-product-list.component.scss'],
})
export class AddedProductListComponent implements OnInit {
  addedProductList: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.onAddedProduct().subscribe((resp: Product) => {
      this.addedProductList.push(resp);
      console.log(this.addedProductList);
    });
  }
}
