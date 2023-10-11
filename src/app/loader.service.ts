import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// How to implement global loaders using HTTP Interceptors

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new Subject<boolean>();

  constructor() {
  }

  show() {
     this.isLoading.next(true);
  }

  hide() {
     this.isLoading.next(false);
  }
}
