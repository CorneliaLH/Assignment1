import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory';

import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  category: ICategory[] = [];
  productsdisplayed: Product[] = [];
  searchProduct: Product[] = [];
  searchTerm = new Subject<string>();
  searchProducts: Observable<Product[]> = new Observable();
  resultSearch: boolean = true;
  searchList: Product[] = [];

  searchForm = this.fb.group({
    search: ['', [Validators.minLength(2)]],
  });

  constructor(
    private productservice: ProductService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  //Funktion för att presentera alla produkter

  allProducts() {
    this.productsdisplayed = [];
    for (let i = 0; i < this.products.length; i++) {
      this.productsdisplayed.push(this.products[i]);
    }
  }

  //Funktion för att välja filmer efter kategori

  enterCategory(id: number) {
    this.productsdisplayed = [];
    this.products.forEach((movie) => {
      for (let i = 0; i < movie.productCategory.length; i++) {
        if (movie.productCategory[i].categoryId === id) {
          this.productsdisplayed.push(movie);
        }
      }
    });
  }

  //hämtar kategorier och filmer från service
  ngOnInit(): void {
    this.productservice.products$.subscribe((data: Product[]) => {
      this.products = data;
    });

    this.productservice.categories$.subscribe((data: ICategory[]) => {
      this.category = data;
    });
    this.productservice.getCategories();
    this.productservice.getProducts();

    //
    this.searchProducts = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((searchTermFromUser: string) => searchTermFromUser.length > 1),
      switchMap((searchTermFromUser) =>
        this.productservice.searchForProduct(searchTermFromUser)
      )
    );

    this.searchProducts.subscribe((products) => {
      this.searchList = products;
      if (this.searchList.length === 0 || null || undefined) {
        this.resultSearch = false;
      } else if (this.searchList.length === 1) {
        this.resultSearch = true;
        this.searchProduct = products;
        this.searchProduct.forEach((product) => {
          this.router.navigate(['/products', product.id]);
        });
      } else if (this.searchList.length > 1) {
        this.resultSearch = true;
        this.productsdisplayed = products;
      }
    });
  }

  search(inputSearchValue: string) {
    this.searchTerm.next(inputSearchValue);
  }
}
