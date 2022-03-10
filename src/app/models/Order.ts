import { OrderRows } from './OrderRows';

export class Order {
  id: number;
  companyId: 17;
  created: Date;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: OrderRows[];
  constructor(
    id: number,
    companyID: 17,
    created: Date,
    createdBy: string,
    paymentMethod: string,
    totalPrice: number,
    status: number,
    orderRows: OrderRows[]
  ) {
    (this.id = id),
      (this.companyId = 17),
      (this.created = new Date()),
      (this.createdBy = createdBy),
      (this.paymentMethod = paymentMethod);
    (this.totalPrice = totalPrice),
      (this.status = status),
      (this.orderRows = orderRows);
  }
}
