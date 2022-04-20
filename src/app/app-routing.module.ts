import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from "./shared/error/error.component";

const routes: Routes = [
  {path: 'item' , loadChildren: () => import('./item/item.module').then(m => m.ItemModule)},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
