import { Component, OnInit } from '@angular/core';
import {ItemService} from "../item.service";
import {Item} from "../../model/item";
import {BehaviorSubject, ReplaySubject, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {BrandService} from "../../brand/brand.service";
import {Brand} from "../../model/brand";
import {ItemPage} from "../../model/item-page";
import {ItemRequest} from "../../model/item-request";
import {OrderService} from "../../order/order.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  constructor(
    public itemService: ItemService,
    private brandService: BrandService,
    private orderService: OrderService,
    private router: Router
  ) { }

  items: Item[];
  selectedItem: Item;
  itemPageSubject: ReplaySubject<ItemPage>;
  itemSubscription: Subscription;
  brandSubscription: Subscription;
  selectedBrandSubscription: Subscription;
  brands: Brand[];
  selectedBrand: Brand;

  selectedSort = "";
  minPrice: number;
  maxPrice: number;

  totalElements: any;
  pageSize = 3;
  page = 1;

  itemRequest: ItemRequest ={
    key: undefined,
    direction: undefined,
    itemsPerPage: 6,
    page: 1,
    minPrice: undefined,
    maxPrice: undefined,
    brands: []
  }
  isCollapsed = false;

  cart: Item[] = [];
  inCart = false;

  isOrderPlaced = false;


  ngOnInit(): void {
    this.getItems();
    this.getBrands();
    this.getSelectedBrand();
    this.cart = [...this.itemService.getCart()];
    this.getIsOrderPlaced();
  }

  getItems(): void{
    this.itemPageSubject = this.itemService.getItemPageSubject();
    this.itemSubscription = this.itemPageSubject
      .subscribe(itemPage => {
        this.totalElements = itemPage.totalElements;
        this.items = itemPage.content;
      });
  }

  private getBrands() {
    this.brandSubscription = this.brandService.getBrandsSubject()
      .subscribe(brands => {
        this.brands = brands;
      });
  }

  private getSelectedBrand(){
    this.selectedBrandSubscription = this.brandService
      .selectedBrandSubject
      .subscribe(brand =>{
        this.selectedBrand = brand;
        console.log(this.selectedBrand);
      });
    if (this.selectedBrand){
      this.itemRequest.brands?.push(this.selectedBrand.id);
      this.itemService.getItemsPage(this.itemRequest);
    }

  }

  setCheckbox(id: number){
    if (!this.selectedBrand) return false;
    return id == this.selectedBrand.id;
  }

  getIsOrderPlaced(){
    this.orderService.isOrderPlacedEmitter
      .subscribe(isOrderPlaced => this.isOrderPlaced = isOrderPlaced);
  }


  onSelect(item: Item) {
    this.selectedItem = item;
    this.router.navigate(['/item', this.selectedItem.id]);
  }

  onSortChange() {
    let sort = this.selectedSort.split(',');
    this.itemRequest.key = sort[0];
    this.itemRequest.direction = sort[1];

    this.itemService.getItemsPage(this.itemRequest);
  }

  onPageChange(event: number) {
    this.itemRequest.page = event;
    this.itemService.getItemsPage(this.itemRequest);
  }

  onCheckboxChange(brandId : number, target: any) {
    if (target.checked){
      this.itemRequest.brands?.push(brandId);
    }
    else {
      let index = this.itemRequest.brands.indexOf(brandId);
      this.itemRequest.brands.splice(index, 1);
    }
    this.itemService.getItemsPage(this.itemRequest);
  }

  onPriceChange() {
    this.itemService.getItemsPage(this.itemRequest);
  }

  addToCart(item: Item){
    this.cart.push(item);
    this.itemService.addItemToCart(item);
  }

  removeFromCart(item: Item){
    let index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
    this.itemService.removeItemFromCart(item);
  }

  isItemInCart(item: Item): boolean{
    return this.cart.some(i => i.id == item.id);
  }

  ngOnDestroy(){
    this.itemSubscription.unsubscribe();
    this.brandSubscription.unsubscribe();
  }


}
