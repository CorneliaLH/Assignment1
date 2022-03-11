import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  //Array som sparar i localStorage
  productIdsLSArray: number[] = [];
  productNameArray: Product[] = [];
  order!: Order;
  constructor(
    private orderService: OrderService,
    private LsService: LocalStorageService,
    private router: Router
  ) {}
  submitOrder() {
    if (this.order.totalPrice == undefined) {
      alert('Checkout är tom');
      this.router.navigate(['']);
    } else {
      let order: Order = new Order(
        Number(),
        17,
        new Date(),
        this.order.createdBy,
        this.order.paymentMethod,
        this.order.totalPrice,
        0,
        this.order.orderRows
      );
      this.orderService.createOrder(order).subscribe((data) => {
        if (data) {
          console.log('Order was created successfully!');
          alert('Din order är skickad!');
          this.productIdsLSArray = this.LsService.emptyLocalStorage();
          this.router.navigate(['']);
        }
      });
    }
  }
  changeOrder() {
    this.LsService.removeCheckout();
    this.router.navigate(['/cart']);
  }
  ngOnInit(): void {
    this.productNameArray = this.LsService.productFromLScheckout();
    this.order = this.LsService.orderFromLScheckout();
  }
}
