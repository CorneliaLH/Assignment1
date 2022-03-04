import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=17'
      )
      .subscribe((data) => {
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
    return this.http.post(
      'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
      createBody,

      { headers: httpHeaders }
    );
  }
}
