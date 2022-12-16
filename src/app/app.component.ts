/**
 * @name Product List Display
 * @description Technical Exam by edamama company which requires
 *              viewing of products and adding it to cart
 * @author Paul Elyson Villaceran
 * @date 2022/12/14
 */
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product-display';
  opened: boolean = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );
    this.productService.onCartClick().subscribe((resp) => {
      console.log({ resp });
      this.navigate();
    });
  }

  navigate() {
    this.opened = !this.opened;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        opened: this.opened,
      },
    };
    this.router.navigate(['/'], navigationExtras);
  }

  queryParamsHandler(params: Params) {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
  }
}
