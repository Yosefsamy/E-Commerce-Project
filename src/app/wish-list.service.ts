import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishListArray:string[]=[];



  constructor(private _httpClient : HttpClient) { }


  // ^ Declare addProductToWishlist(id) Function === Add Product To Wish List  -> A P I (POST method) ^ //
  addProductToWishlist(id:string):Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',

    // body
    {
      productId: id
    }

    )
  }

  // ^ Declare getWishlist() Function === Get Logged User Wishlist  -> A P I (GET method) ^ //
  getWishlist(): Observable<any> {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }

    // ^ Declare deleteItem(id:string) Function ===Delete Item From wishList -> A P I (DELETE method) ^ //
    deleteItem(id:string): Observable<any> {
      return this._httpClient.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        // options -> headers
        // {
        //   headers: {
        //     token: `${localStorage.getItem('userToken')}`,
        //     // token:JSON.stringify(localStorage.getItem("userToken"))
        //   },
        // }
      );
    }











}
