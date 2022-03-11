import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderRows } from 'src/app/models/OrderRows';
import { Product } from 'src/app/models/Product';
import { Order } from 'src/app/models/Order';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingcartComponent implements OnInit {
  //Formvariabler
  userInput = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(1)]],
    lastname: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', Validators.required],
  });

  //Array som sparar i localStorage
  productIdsLSArray: number[] = [];

  //FilmArray som printas ut på sidan
  productArray: Product[] = [];

  //Ordervariabler
  totalPrice: number = 0;
  orderRows: OrderRows[] = [];
  amount: number = 0;
  payment = ['Visa', 'MasterCard', 'American Express', 'Paypal'];
  valuePayment: string = '';

  @Output() animationSpeed: number = 1;
  constructor(
    private fb: FormBuilder,
    private productservice: ProductService,
    private orderService: OrderService,
    private LsService: LocalStorageService,
    private router: Router
  ) {}

  //skicka ordder til checkout
  sendOrderToCheckout() {
    let order: Order = new Order(
      Number(),
      17,
      new Date(),
      'Firstname: ' +
        this.userInput.value.firstname +
        ' Lastname: ' +
        this.userInput.value.lastname +
        ' Email: ' +
        this.userInput.value.email,
      this.valuePayment,
      this.totalPrice,
      0,
      this.orderRows
    );
    this.router.navigate(['/checkout']);

    this.LsService.orderToCheckout(order, this.productArray);
  }
  //Ta bort produkt från beställning innan order skickas
  removeItem(i: number) {
    if (
      !this.LsService.getItemLS().some(
        (id) => id === this.orderRows[i].productId
      )
    ) {
      console.log('hej');
      this.productIdsLSArray = this.LsService.getItemLS();
      this.productIdsLSArray.splice(i, 1);
      this.LsService.setItemLS();
      this.orderRows.splice(i, 1);
      this.productArray.splice(i, 1);
    } else {
      console.log('hå');
      this.totalPrice -= this.productArray[i].price;
      this.orderRows[i].amount--;
      this.productIdsLSArray = this.LsService.getItemLS();
      this.productIdsLSArray.splice(i, 1);
      this.LsService.setItemLS();
    }
  }

  ngOnInit(): void {
    //skapa varukorgen från LocalStorage
    //if-sats för att undvika att presentera dubletter, istället ökar amount(antal)
    this.productIdsLSArray = this.LsService.getItemLS();

    this.productservice.products$.subscribe((data) => {
      this.productIdsLSArray.forEach((id) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            if (!this.productArray.some((movie) => movie.id === id)) {
              this.amount = 1;
              this.productArray.push(
                new Product(
                  data[i].id,
                  data[i].name,
                  data[i].description,
                  data[i].price,
                  data[i].imageUrl,
                  data[i].year,
                  data[i].productCategory
                )
              );

              this.orderRows.push(
                new OrderRows(
                  Number(),
                  data[i].id,
                  null,
                  this.amount++,
                  Number()
                )
              );
            } else {
              for (let u = 0; u < this.orderRows.length; u++) {
                if (this.orderRows[u].productId === id) {
                  this.orderRows[u].amount++;
                  this.totalPrice += data[i].price;
                  return;
                }
              }
            }
            this.totalPrice += data[i].price;
          }
        }
      });
    });
    this.productservice.getProducts();
  }
}
