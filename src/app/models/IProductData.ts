import { Observable } from 'rxjs';
import { ICategory } from './ICategory';
import { Product } from './Product';

export interface IProductData {
  products$: Observable<Product[]>;
  categories$: Observable<ICategory[]>;

  getProducts(): void;
  getCategories(): void;
}
