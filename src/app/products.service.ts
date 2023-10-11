import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient : HttpClient) { }

    // ^ Declare getProducts() Function === Get All Products -> A P I ^ //
  getProducts():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products");
  }


    // ^ Declare getProductDetails(productId) Function === Get specific Product Details -> A P I ^ //
    getProductDetails(productId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  }


    // ^ Declare getCategories() Function === Get All Categories -> A P I ^ //
    getCategories():Observable<any>{
      return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories");
    }



    // ^ Declare getSpecificCategory(categoryId:string) Function === Get All SubCategories On Category -> A P I ^ //
    getSpecificCategory(categoryId:string):Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    }



  }
