import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RemoveUndefinedParamsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let params = request.params;
    for (const key of request.params.keys()) {
      if (params.get(key) === undefined || params.get(key) === null) {
        params = params.delete(key, undefined);
      }
    }
    request = request.clone({ params });
    console.log(request.urlWithParams);
    return next.handle(request);
  }
}
