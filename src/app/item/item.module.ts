import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    ItemComponent,
    ItemDetailComponent
  ],
    imports: [
        CommonModule,
        ItemRoutingModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class ItemModule { }
