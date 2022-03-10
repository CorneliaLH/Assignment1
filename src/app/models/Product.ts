import { IProductCategory } from './IProductCategory';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  productCategory: IProductCategory[];
  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    year: number,
    productCategory: IProductCategory[]
  ) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.price = price),
      (this.imageUrl = imageUrl),
      (this.year = year),
      (this.productCategory = productCategory);
  }
}
