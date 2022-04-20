import {Brand} from "./brand";

export interface Item {
  id: number,
  name: string,
  description: string,
  price: number,
  quantity: number,
  brand: Brand
}
