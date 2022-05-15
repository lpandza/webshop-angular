import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {Discount} from "../model/discount";
import {Item} from "../model/item";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private discountUrl = environment.API_URL + '/api/discount';
  private orderUrl = environment.API_URL + '/api/order';

  isOrderPlacedEmitter : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  order: Order;

  constructor(
    private http: HttpClient
  ) { }

  getDiscount(code: String){
    code = code.trim();
    return this.http.get<Discount>(`${this.discountUrl}?code=${code}`);
  }

  addOrder(order: Order){
    console.log(order);
    this.http.post<Order>(`${this.orderUrl}`, order)
      .pipe(
        catchError(err => this.handleError(err))
      )
      .subscribe(order => console.log(order));
  }

  emmitOrder(){
    this.isOrderPlacedEmitter.next(true);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
