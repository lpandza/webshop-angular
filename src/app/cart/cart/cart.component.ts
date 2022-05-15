import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../item/item.service";
import {Item} from "../../model/item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private itemService: ItemService
  ) { }

  cart: Item[];

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cart = [...this.itemService.getCart()];
  }

  removeFromCart(item: Item) {
    this.cart = this.cart.filter(i => i.id != item.id);
    this.itemService.removeItemFromCart(item);
  }
}
