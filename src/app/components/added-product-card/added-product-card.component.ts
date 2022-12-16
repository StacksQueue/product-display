import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Products';

@Component({
  selector: 'app-added-product-card',
  templateUrl: './added-product-card.component.html',
  styleUrls: ['./added-product-card.component.scss'],
})
export class AddedProductCardComponent implements OnInit {
  @Input() addedProduct: Product | any;
  @Output() removeProductEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}


  removeAddedProduct() {
    this.removeProductEvent.emit('')
  }
}
