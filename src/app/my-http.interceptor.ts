import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../src/app/loader.service' ;
import { finalize } from 'rxjs/operators';
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    let myRequest=request.clone({
      headers:request.headers.set("token" , `${localStorage.getItem('userToken')}`)
    })
    return next.handle(myRequest).pipe(
      finalize(() => this.loaderService.hide()),
);
  }
}
