import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ProductOrder } from 'src/app/models/ProductOrder';
import { Movie } from 'src/app/models/Movie';
import { Order } from 'src/app/models/Order';
import { MovieService } from 'src/app/services/movie.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shoppingbag',
  templateUrl: './shoppingbag.component.html',
  styleUrls: ['./shoppingbag.component.scss'],
})
export class ShoppingbagComponent implements OnInit {
  //Formvariabler
  userInput = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(1)]],
    lastname: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', Validators.required],
  });

  //Array som sparar i localStorage
  movieIdsLSArray = [];

  //filmArray som printas ut på sidan
  movieArray: Movie[] = [];

  //Ordervariabler
  totalPrice: number = 0;
  orderRows: ProductOrder[] = [];
  amount: number = 0;
  payment = ['Visa', 'MasterCard', 'American Express', 'Paypal'];
  valuePayment: string = '';

  constructor(
    private fb: FormBuilder,
    private service: MovieService,
    private orderService: OrderService
  ) {}

  submitOrder() {
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

    console.log(order);
    this.orderService.createOrder(order).subscribe((data) => {
      console.log('Order was created successfully!');
      console.log(data);
    });
    this.movieIdsLSArray = [];
    localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
    alert('Din order är skickad!');
  }
  //Ta bort produkt från beställning
  removeItem(i: number) {
    console.log(this.orderRows[i].amount);
    if (this.orderRows[i].amount >= 1) {
      this.totalPrice -= this.movieArray[i].price;
      this.orderRows[i].amount--;
      let index = this.movieIdsLSArray.findIndex(
        (id) => id === this.movieArray[i].id
      );
      this.movieIdsLSArray.splice(index, 1);
      localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
    } else if (
      this.movieIdsLSArray.some((id) => id !== this.orderRows[i].productId)
    ) {
      console.log(this.movieArray);
      this.movieArray.splice(i, 1);
      console.log(this.movieArray);
    }
  }

  ngOnInit(): void {
    let movieArray: string = localStorage.getItem('id') || '[]';
    this.movieIdsLSArray = JSON.parse(movieArray);
    this.service.movies$.subscribe((data) => {
      this.movieIdsLSArray.forEach((id) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            if (!this.movieArray.some((movie) => movie.id === id)) {
              this.amount = 1;
              this.movieArray.push(
                new Movie(
                  data[i].id,
                  data[i].name,
                  data[i].description,
                  data[i].price,
                  data[i].imageUrl,
                  data[i].year,
                  data[i].productCategory
                )
              );
              console.log(this.movieArray);
              this.orderRows.push(
                new ProductOrder(
                  Number(),
                  data[i].id,
                  null,
                  this.amount++,
                  Number()
                )
              );
              console.log(this.orderRows);
            } else {
              for (let u = 0; u < this.orderRows.length; u++) {
                if (this.orderRows[u].productId === id) {
                  this.orderRows[u].amount++;
                  this.totalPrice += data[i].price;
                  console.log(this.orderRows[u].amount);
                  return;
                }
              }
            }
            this.totalPrice += data[i].price;
          }
        }
      });
    });
    this.service.getMovies();
  }
}
