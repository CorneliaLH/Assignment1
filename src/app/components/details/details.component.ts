import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  productId: number = 0;
  product: Product = new Product(0, '', '', 0, '', 0, []);
  productsArray: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productservice: ProductService,
    private serviceLS: LocalStorageService
  ) {}

  ngOnInit(): void {
    //hämtar id från url
    this.route.params.subscribe((p) => {
      this.productId = +p['id'];
    });

    //hämtar produkt efter id
    this.productservice.products$.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.productId) {
          this.product = data[i];
        }
      }
    });

    this.productservice.getProducts();
  }

  //sparar vald produkt i LocalStorage
  putItemInCart(productId: number) {
    this.serviceLS.saveToLocalStorage(productId);
    alert('Produkt tillagd i varukorgen');
  }
}
