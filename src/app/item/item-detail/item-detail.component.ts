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

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void{
    let id = this.route.snapshot.paramMap.get('id');
    this.itemService.getOneItem(id)
      .subscribe(item => {
        console.log(item);
        this.item = item
      });
  }

}
