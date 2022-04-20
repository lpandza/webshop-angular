import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, ReplaySubject, throwError} from "rxjs";
import {Item} from "../model/item";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ItemPage} from "../model/item-page";
import {ItemRequest} from "../model/item-request";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemUrl = environment.API_URL + '/api/item';

  itemRequest: ItemRequest ={
    key: undefined,
    direction: undefined,
    itemsPerPage: 3,
    page: 1,
    minPrice: undefined,
    maxPrice: undefined,
    brands: []
  }

  items: Item[];
  itemPage: ReplaySubject<ItemPage> = new ReplaySubject<ItemPage>(1);
  item: ReplaySubject<Item> = new ReplaySubject<Item>(1);

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
    console.log(itemRequest);
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
