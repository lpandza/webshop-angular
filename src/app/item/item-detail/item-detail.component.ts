import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {ActivatedRoute} from "@angular/router";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  item: Item;
  cart: Item[];

  ngOnInit(): void {
    this.getItem();
    this.getCart();
  }

  getItem(): void{
    let id = this.route.snapshot.paramMap.get('id');
    this.itemService.getOneItem(id)
      .subscribe(item => {
        console.log(item);
        this.item = item
      });
  }

  addItemToCart(item: Item) {
    this.itemService.addItemToCart(item);
  }

  isItemInCart(item: Item) {
    return this.cart.some(i => i.id == item.id);
  }

  removeItemFromCart(item: Item) {
    this.itemService.removeItemFromCart(item);
    let index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
  }

  private getCart() {
    this.cart = this.itemService.getCart();
  }
}
