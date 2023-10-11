import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  // brandId:BehaviorSubject<string>=new BehaviorSubject('');
  brandId:string='';

  constructor(private _HttpClient : HttpClient) { }


  // ^ Declare getBrands() Function === Get All Brands -> A P I ^ //
  getBrands():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/brands");
  }


  // ^ Declare getSpecificBrand(id:string) Function === Get Specific Brand -> A P I ^ //
  getSpecificBrand(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

}
