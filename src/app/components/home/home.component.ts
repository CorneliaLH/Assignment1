import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  //Animation för att presentera produkter
  animations: [
    trigger('enterAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(1000, style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movieURL: string =
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg';
  movies: Product[] = [];
  toggle: boolean = true;

  constructor(private productservice: ProductService, private router: Router) {}
  toggleElement() {
    this.toggle = !this.toggle;
  }
  navigateToProducts() {
    this.router.navigate(['/products']);
  }
  ngOnInit(): void {
    //hämtar produkter och url till img byts ut med intervall om 2 s
    this.productservice.products$.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let movie = data[i].imageUrl;
        setTimeout(() => {
          this.toggle = !this.toggle;
          this.movieURL = movie;
        }, 2000 * (i + 1));
      }
    });
    this.productservice.getProducts();
  }
}
