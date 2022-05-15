import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {RemoveUndefinedParamsInterceptor} from "./item/remove-undefined-params.interceptor";
import { FontAwesomeModule, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {faSquare, faCheckSquare, faSquareCaretDown, faTrash} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPaginationModule,
        SharedModule,
        FontAwesomeModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RemoveUndefinedParamsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCheckSquare,
      faSquareCaretDown,
      faTrash
    )
  }
}
