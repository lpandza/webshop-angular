import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {OrderService} from "../order.service";
import {Discount} from "../../model/discount";
import {ItemService} from "../../item/item.service";
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  orderForm = this.fb.group({
    firstName: ['',{
      validators: [
        Validators.required
      ]
    }],
    lastName: ['',{
      validators: [
        Validators.required
      ]
    }],
    email: ['', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }],
    address: ['',{
      validators: [
        Validators.required
      ]
    }],
    phoneNumber: ['',{
      validators: [
        Validators.required
      ]
    }],
    cardName: ['',{
      validators: [
        // Validators.required
      ]
    }],
    cardNumber: ['',{
      validators: [
        // Validators.required
      ]
    }],
    cardExp: ['',{
      validators: [
        // Validators.required
      ]
    }],
    cardCcv: ['',{
      validators: [
        // Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]
    }],
  });

  creditCard = true;
  discountCode = "";
  isCodeValid = true;
  isCodeUsed = false;

  discount: Discount;
  cart: Item[];
  totalPrice = 0;
  priceWithDiscount: number;
  discountValue: number;

  order: Order;

  getDiscount(discountCode: string) {
    this.orderService.getDiscount(discountCode)
      .subscribe({
        error: err => {
          console.log(err);
          this.isCodeValid = false;
          this.isCodeUsed = false;
        },
        next: discount => {
          this.discount = discount;
          this.isCodeValid = true;
          this.isCodeUsed = discount.isUsed;
          if (!this.isCodeUsed){
            this.calculateDiscountValue();
            this.calculatePriceWithDiscount();
          }

        }
      })
  }


  setSelection(b: boolean) {
    this.creditCard = b;
  }

  placeOrder() {
    this.cart = this.itemService.getCart();

    let newCart: Item[] = [];
    this.cart.forEach(item => {
      let n = item.itemCount ?? 0;
      for (let i = 0; i < n; i++){
        newCart.push(item);
        delete item.itemCount;
      }
    });
    this.setOrder(this.orderForm.value, this.cart, this.totalPrice);
    this.orderService.addOrder(this.order);
    this.navigateToItems();
  }

  private navigateToItems() {
    this.itemService.getCart().splice(0);
    this.itemService.resetItemCount();
    this.orderService.emmitOrder();
    this.router.navigate(['/item']);
  }

  private setOrder(orderForm: any, cart: Item[], price: number) {
    delete orderForm.cardCcv;
    delete orderForm.cardName;
    delete orderForm.cardNumber;
    delete orderForm.cardExp
    this.order = orderForm;
    this.order.items = cart;
    this.order.price = price;
    this.setDiscount();
  }

  private setDiscount() {
    if (this.discount == undefined || this.discount.isUsed || !this.isCodeValid) this.order.discount = null;
    else this.order.discount = this.discount;
  }

  getCart(){
    this.cart = this.itemService.getCart();
    this.getTotalPrice();
  }

  getTotalPrice(){
    this.cart.forEach(item => {
      let n = item.itemCount ?? 1;
      this.totalPrice += item.price * n;
    });
  }

  calculatePriceWithDiscount(){
    this.priceWithDiscount = this.totalPrice - (this.totalPrice * (this.discount.discountPercentage / 100));
  }

  calculateDiscountValue(){
    this.discountValue = this.totalPrice * (this.discount.discountPercentage / 100);
  }

  get firstName() {
    return this.orderForm.get('firstName');
  }

  get lastName() {
    return this.orderForm.get('lastName');
  }

  get email() {
    return this.orderForm.get('email');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get phoneNumber() {
    return this.orderForm.get('phoneNumber');
  }

  get cardName() {
    return this.orderForm.get('cardName');
  }

  get cardNumber() {
    return this.orderForm.get('cardNumber');
  }

  get cardExp() {
    return this.orderForm.get('cardExp');
  }

  get cardCcv() {
    return this.orderForm.get('cardCcv');
  }

}
