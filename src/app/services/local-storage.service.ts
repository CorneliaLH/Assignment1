import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  movieIdsLSArray: number[] = [];
  checkoutObject!: Order;
  productNameArray!: Product[];
  constructor() {}

  //spara id på produkt till ls
  saveToLocalStorage(movieId: number) {
    let movieArray: string = localStorage.getItem('id') || '[]';
    this.movieIdsLSArray = JSON.parse(movieArray);
    this.movieIdsLSArray.push(movieId);
    localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
  }

  setItemLS() {
    return localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
  }

  getItemLS() {
    let movieArray: string = localStorage.getItem('id') || '[]';
    this.movieIdsLSArray = JSON.parse(movieArray);
    return this.movieIdsLSArray;
  }

  //order till LS från varukorgen
  orderToCheckout(order: Order, products: Product[]) {
    localStorage.setItem('checkout', JSON.stringify(order));
    localStorage.setItem('productName', JSON.stringify(products));
  }

  //order från LS till checkout
  orderFromLScheckout() {
    let checkoutOrder: string = localStorage.getItem('checkout') || '[]';
    this.checkoutObject = JSON.parse(checkoutOrder);
    return this.checkoutObject;
  }
  //produkter från LS till checkout
  productFromLScheckout() {
    let productNameOrder: string = localStorage.getItem('productName') || '[]';
    this.productNameArray = JSON.parse(productNameOrder);
    return this.productNameArray;
  }
  //tömmer LS när order skickas
  emptyLocalStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('checkout');
    localStorage.removeItem('productName');
    return [];
  }
  //Tömmer LS på order och produkter, varukorgen finns kvar
  removeCheckout() {
    localStorage.removeItem('checkout');
    localStorage.removeItem('productName');
    return;
  }
}
