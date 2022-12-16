import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-added-product-list',
  templateUrl: './added-product-list.component.html',
  styleUrls: ['./added-product-list.component.scss'],
})
export class AddedProductListComponent implements OnInit {
  addedProductList: Product[] = [];
  totalPrice = 0;
  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.onAddedProduct().subscribe((resp: Product) => {
      this.addedProductList.push(resp);
      // console.log(this.addedProductList);
      this.getTotalPrice();
    });
  }

  onRemoveProductEvent(event: any, index: number) {
    console.log(event, { index });
    this.addedProductList.splice(index, 1);
    this._snackBar.open('PRODUCT SUCCESSFULLY REMOVED', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['mat-toolbar', 'custom-snackbar'],
    });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (let product of this.addedProductList) {
      console.log(this.totalPrice);
      this.totalPrice += parseInt(product.price.toString());
    }
  }
}
