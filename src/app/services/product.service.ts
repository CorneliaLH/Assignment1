import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/ICategory';
import { IProductData } from '../models/IProductData';

import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements IProductData {
  productList: Product[] = [];
  constructor(private http: HttpClient) {}

  private products = new Subject<Product[]>();
  products$: Observable<Product[]> = this.products.asObservable();
  private category = new Subject<ICategory[]>();
  categories$: Observable<ICategory[]> = this.category.asObservable();
  searchTerm = new Subject<string>();
  searchProducts$: Observable<Product[]> = new Observable();

  getProducts(): void {
    this.http.get<Product[]>(environment.urlProducts).subscribe((data) => {
      this.productList = data;
      this.products.next(data);
    });
  }
  getCategories(): void {
    this.http.get<ICategory[]>(environment.urlCategories).subscribe((data) => {
      this.category.next(data);
      console.log(data);
    });
  }
  searchForProduct(input: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(environment.urlSearch + input)
      .pipe(map((data: Product[]) => data));
  }
}
