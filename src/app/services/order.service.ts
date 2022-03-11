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
  order!: Order;

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
    return this.http
      .post<Order>(environment.urlOrder, createBody)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    alert('Error: Order inte skickad, försök igen!');
    return throwError(error);
  }
}
