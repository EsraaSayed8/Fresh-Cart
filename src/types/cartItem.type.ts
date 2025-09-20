import { ProductType } from "./product.type";

export interface CartItemType {
  _id: number;
  count: number;
  product: ProductType
  price: number;
}