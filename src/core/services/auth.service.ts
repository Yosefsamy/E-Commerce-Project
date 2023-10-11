import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ^ Declare this property with BehaviorSubject like observable to subscribe ^//
  userData:BehaviorSubject<any>=new BehaviorSubject('');

  constructor(private _HttpClient : HttpClient , private _router : Router) {
    // This Step when i refresh = check are there any data in local storage or not
    if(localStorage.getItem("userToken")){
      // * Call getUserData() Function === to change the value of userData * //
      this.getUserData();
    }
  }

  // ^ Declare register(data) Function === data refer to data will send to API ^ //
  // ^ this function used to send data to API ^ //
  // * signUp * //
  register(data:any):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup",data)
  }



  // ^ Declare register(data) Function === data refer to data will send to API ^ //
  // ^ this function used to send data to API ^ //
  // * signIn * //
  login(data:any):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin",data)
  }



  // ^ Declare getUserData() Function === receive token from local storage and decode it ^ //
  // * Token * //
  getUserData(){
    let encodedToken=JSON.stringify(localStorage.getItem("userToken"));
    let encoded=jwtDecode(encodedToken);
    console.log("data",encoded);
    this.userData.next(encoded);
  }


  // ^ Declare forgetPassword(data:any) Function === this function when we send email to backend -> send code to user on his email ^ //
  forgetPassword(data:any): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
  }




  // ^ Declare verifyResetCode(data:any) Function === this function when we send code to backend ->  ^ //
  verifyResetCode(data:any): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data)
  }



  // ^ Declare verifyResetCode(data:any) Function === this function when we send new password to backend ->  ^ //
  resetPassword(data:any): Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data)
  }




    // ^ Declare logOut() Function ^ //
  // * logOut * //
  logOut(){
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._router.navigate(['/login']);
  }

}
