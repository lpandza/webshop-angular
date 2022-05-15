import {Discount} from "./discount";
import {Item} from "./item";

export interface Order {
  id?: number,
  price: number,
  address: string,
  email: string,
  phoneNumber: string,
  discount: Discount | null,
  items: Item[]
}
