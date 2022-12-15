import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Product } from 'src/app/models/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartSubject = new Subject();
  productSubject = new Subject<Product>()

  constructor(private https: HttpClient) {}

  onCartClick(): Observable<any> {
    return this.cartSubject.asObservable();
  }

  getProducts(): Observable<any> {
    return this.https
      .get('https://dummyjson.com/products', {})
      .pipe(catchError(this.handleError));
  }

  onAddedProduct(): Observable<Product> {
    return this.productSubject.asObservable();
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
