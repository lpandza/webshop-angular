import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../item/item.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private itemService: ItemService
  ) { }

  itemCount = 0;

  ngOnInit(): void {
    this.addItem();
  }

  addItem(){
    this.itemService.itemCountSubject
      .subscribe(itemCount => {
        this.itemCount = itemCount
      });
  }

}
