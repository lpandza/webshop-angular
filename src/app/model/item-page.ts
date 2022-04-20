import {Item} from "./item";

export interface ItemPage {
  content: Item[]
  totalElements: number;
  totalPages: number;
}
