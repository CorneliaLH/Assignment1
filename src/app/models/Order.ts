import { IUser } from './IUser';
import { ProductOrder } from './ProductOrder';

export class Order {
  id: number;
  companyId: 17;
  created: Date;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: ProductOrder[];
  constructor(
    id: number,
    companyID: 17,
    created: Date,
    createdBy: string,
    paymentMethod: string,
    totalPrice: number,
    status: number,
    orderRows: ProductOrder[]
  ) {
    (this.id = id),
      (this.companyId = 17),
      (this.created = new Date()),
      (this.createdBy = createdBy),
      (this.paymentMethod = 'Paypal');
    (this.totalPrice = totalPrice),
      (this.status = status),
      (this.orderRows = orderRows);
  }
}
