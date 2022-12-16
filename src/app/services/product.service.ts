import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Product } from 'src/app/models/Products';
import { SERVER_URL } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartSubject = new Subject();
  productSubject = new Subject<Product>();

  constructor(private https: HttpClient) {}

  onCartClick(): Observable<any> {
    return this.cartSubject.asObservable();
  }

  getProducts(pagination: Pagination, searchedWord: string): Observable<any> {
    let params = new HttpParams();
    let skip = pagination.page * pagination.limit;
    params = params.append('limit', pagination.limit);
    params = params.append('page', pagination.page);
    params = params.append('search', searchedWord);

    console.log(params);
    return this.https
      .get(`${SERVER_URL}/product`, { params })
      .pipe(catchError(this.handleError));
  }

  onAddedProduct(): Observable<Product> {
    return this.productSubject.asObservable();
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
