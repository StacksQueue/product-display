import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartSubject = new Subject();

  constructor() {}

  onCartClick(): Observable<any> {
    return this.cartSubject.asObservable();
  }
}
