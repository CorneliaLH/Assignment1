import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  private product = new Subject<Order[]>();
  public product$: Observable<Order[]> = this.product.asObservable();

  getOrders() {
    this.http
      .get<Order[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders/' +
          '?companyId=17'
      )
      .subscribe((data: Order[]) => {
        this.product.next(data);
      });
  }

  deleteOrders(id: number) {
    this.http
      .delete(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders/' +
          id +
          '?companyId=17'
      )
      .subscribe(() => this.getOrders());
  }
  createOrder(createBody: Order) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('', 'application/json');

    return this.http
      .post(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders/',
        createBody,

        { headers: httpHeaders }
      )
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    alert('Error: Order inte skickad, försök igen!');
    return throwError(error);
  }
}
