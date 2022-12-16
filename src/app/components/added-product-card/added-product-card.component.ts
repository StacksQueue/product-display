import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Products';

@Component({
  selector: 'app-added-product-card',
  templateUrl: './added-product-card.component.html',
  styleUrls: ['./added-product-card.component.scss'],
})
export class AddedProductCardComponent implements OnInit {
  @Input() addedProduct: Product | any;

  constructor() {}

  ngOnInit(): void {}
}
