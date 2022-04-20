import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {RemoveUndefinedParamsInterceptor} from "./item/remove-undefined-params.interceptor";

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
        SharedModule
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
export class AppModule { }
