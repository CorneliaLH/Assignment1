export class OrderRows {
  id: number;
  productId: number;
  product: null;
  amount: number;
  orderId: number;
  constructor(
    id: number,
    productId: number,
    product: null,
    amount: number,
    orderId: number
  ) {
    (this.id = id),
      (this.productId = productId),
      (this.product = product),
      (this.amount = amount),
      (this.orderId = orderId);
  }
}
