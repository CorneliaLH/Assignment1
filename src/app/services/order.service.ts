import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
      .get<Order[]>(environment.urlOrder + '?companyId=17')
      .subscribe((data: Order[]) => {
        this.product.next(data);
      });
  }

  deleteOrders(id: number) {
    this.http
      .delete(environment.urlOrder + id + '?companyId=17')
      .subscribe(() => this.getOrders());
  }
  createOrder(createBody: Order) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('', 'application/json');
    return this.http.post(
      environment.urlOrder,
      createBody,

      { headers: httpHeaders }
    );
  }
}
