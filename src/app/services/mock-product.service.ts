import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ICategory } from '../models/ICategory';
import { IProductData } from '../models/IProductData';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class MockProductService implements IProductData {
  private products = new Subject<Product[]>();
  products$: Observable<Product[]> = this.products.asObservable();
  private category = new Subject<ICategory[]>();
  categories$: Observable<ICategory[]> = this.category.asObservable();
  searchTerm = new Subject<string>();
  searchProducts$: Observable<Product[]> = new Observable();
  constructor() {}

  private testDataProduct: Product[] = [
    new Product(1, 'Movie1', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
    new Product(2, 'Movie2', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
    new Product(3, 'Movie3', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
    new Product(4, 'Movie4', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
    new Product(5, 'Movie5', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
    new Product(6, 'Movie6', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
    new Product(7, 'Movie6', 'Story', 100, 'URL', 1900, [
      { categoryId: 1, category: null },
    ]),
  ];

  private testDataCategories: ICategory[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
  ];

  getProducts(): void {
    this.products.next(this.testDataProduct);
  }
  getCategories(): void {
    this.category.next(this.testDataCategories);
  }
}
