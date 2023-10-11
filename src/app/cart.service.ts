import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  numberItems:BehaviorSubject<number>=new BehaviorSubject(0);
  constructor(private _httpClient: HttpClient) {}

  // ^ Declare addProductToCart(product.id) Function === Add Product To A P I (POST method) ^ //
  addProductToCart(id: string): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',

      // body
      {
        productId: id,
      },

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }

  // ^ Declare getCart() Function === Get Logged User Cart  A P I (GET method) ^ //
  getCart(): Observable<any> {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/cart',

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }




  // ^ Declare deleteItem(id:string) Function ===Delete Item From A P I (DELETE method) ^ //
  deleteItem(id: string): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }




  // ^ Declare updateProductCount(count:number , id:string) Function === Update  Product Count (PUT method) ^ //
  updateProductCount(count: number, id: string): Observable<any> {
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      // body
      {
        // Convert count from number to string
        count: `${count}`,
      },

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }




  // ^ Declare generateOnlinePayment(cartId:string , shippingAddress:any) Function === Send data to api (details of shippingAddress Form) (POST method) ^ //
  generateOnlinePayment(cartId:string , shippingAddress:any): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,

      // body
      {
        shippingAddress: shippingAddress
      },

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }



  // ^ Declare cashPayment(cartId:string , shippingAddress:any) Function === Send data to api (details of shippingAddress Form) (POST method) ^ //
  cashPayment(cartId:string , shippingAddress:any): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,

      // body
      {
        shippingAddress: shippingAddress
      },

      // options -> headers
      // {
      //   headers: {
      //     token: `${localStorage.getItem('userToken')}`,
      //     // token:JSON.stringify(localStorage.getItem("userToken"))
      //   },
      // }
    );
  }




    // ^ Declare clearCart() Function === clear user cart (DELETE method) ^ //
    clearCart(): Observable<any> {
      return this._httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart' ,


        // options -> headers
        // {
        //   headers: {
        //     token: `${localStorage.getItem('userToken')}`,
        //   },
        // }
      );
    }


}

