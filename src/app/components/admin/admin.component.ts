import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderRows } from 'src/app/models/OrderRows';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  myCompanyOrders: Order[] = [];
  productList: Product[] = [];
  orderRowAmount: number = 0;
  totalAmount: number[] = [];
  // productName: string[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.orderService.getOrders();

    // this.productService.products$.subscribe((data: Product[]) => {
    //   this.productList = data;
    //   this.productList.forEach((product) => {
    //     this.myCompanyOrders.forEach((order) => {
    //       if (order.orderRows.some((order) => order.productId === product.id)) {
    //         this.productName = [];
    //         this.productName.push(product.name);
    //         console.log(product.name);

    //         // this.productName.push(product.name)
    //       }
    //     });
    //   });
    // });
    this.productService.getProducts();
    //Listan med orders hämtas från service
    this.orderService.product$.subscribe((data: Order[]) => {
      this.myCompanyOrders = data;
      //loop för att skapa totala antalet produkter
      this.myCompanyOrders.forEach((order) => {
        this.orderRowAmount = 0;
        order.orderRows.forEach((orderRow) => {
          this.orderRowAmount += orderRow.amount;
        });

        this.totalAmount.push(this.orderRowAmount);
      });
    });
    this.orderService.getOrders();
  }

  deleteOrders(id: number) {
    this.orderService.deleteOrders(id);
  }
}
