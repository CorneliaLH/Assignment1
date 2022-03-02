import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  myCompanyOrders: Order[] = [];
  constructor(private service: OrderService) {}

  ngOnInit(): void {
    this.service.product$.subscribe((data: Order[]) => {
      console.log(data);
      this.myCompanyOrders = data;
    });
    this.service.getOrders();
  }

  deleteOrders(id: number) {
    this.service.deleteOrders(id);
  }
}
