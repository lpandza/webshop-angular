import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from "./shared/error/error.component";

const routes: Routes = [
  {path: 'item' , loadChildren: () => import('./item/item.module').then(m => m.ItemModule)},
  {path: 'brands' , loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)},
  {path: 'cart' , loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'order' , loadChildren: () => import('./order/order.module').then(m => m.OrderModule)},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
