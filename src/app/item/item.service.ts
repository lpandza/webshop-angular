import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, ReplaySubject, Subject, throwError} from "rxjs";
import {Item} from "../model/item";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ItemPage} from "../model/item-page";
import {ItemRequest} from "../model/item-request";
import {Order} from "../model/order";
import {OrderService} from "../order/order.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemUrl = environment.API_URL + '/api/item';

  itemRequest: ItemRequest ={
    key: undefined,
    direction: undefined,
    itemsPerPage: 6,
    page: 1,
    minPrice: undefined,
    maxPrice: undefined,
    brands: []
  }

  items: Item[];
  itemPage: ReplaySubject<ItemPage> = new ReplaySubject<ItemPage>(1);
  item: ReplaySubject<Item> = new ReplaySubject<Item>(1);
  itemCountSubject : Subject<number> = new Subject<number>();

  public itemCount = 0;
  private cart: Item[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  private init() {
    this.getItemsPage(this.itemRequest);
  }

  getItemPageSubject(){
    return this.itemPage;
  }

  getOneItem(id: string | null){
    return this.http.get<Item>(`${this.itemUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  getItemsPage(itemRequest: any){
    this.http.get<ItemPage>
      (`${this.itemUrl}`, {params: new HttpParams({fromObject: itemRequest}) })
      .pipe(
        catchError(err => this.handleError(err))
      )
      .subscribe(itemPage => {
        this.items = itemPage.content
        this.itemPage.next(itemPage);
      });
  }

  addItemToCart(item: Item){
    console.log(this.cart);
    this.itemCount++;
    this.cart.push(item);
    item.itemCount = 1;
    this.itemCountSubject.next(this.cart.length);
  }

  removeItemFromCart(item: Item){
    this.itemCount--;
    let index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
    this.itemCountSubject.next(this.itemCount);
  }

  resetItemCount(){
    this.itemCountSubject.next(this.cart.length);
  }


  getCart(){
    return this.cart;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    this.router.navigate(['/error']);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
