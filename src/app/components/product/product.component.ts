import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  //skapar varje produkt
  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    year: 0,
    productCategory: [{ categoryId: 0, category: null }],
  };
  @Output() animationSpeed: number = 1;
  constructor() {}

  ngOnInit(): void {}
}
