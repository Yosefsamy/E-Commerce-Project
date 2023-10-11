import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  notValidForm:boolean=false;
  isLoading:boolean=false;  //! for online payment !//
  loading:boolean=false;    //! for cash payment !//
  // Property will hold the cart id
  cartId:string="";

  // ^ Declare A Reactive Form ^ //
  shippingAddress:FormGroup=new FormGroup({
    details:new FormControl("",[Validators.required,Validators.minLength(3)]),
    phone:new FormControl("",[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl("",[Validators.required])
  })



  constructor( private _cartService:CartService ,
     private _activatedRoute : ActivatedRoute ,
      private _router:Router ){}

  ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe((res:any)=>{
        console.log(res);
        // kda l cardId property hold l cartIf founded in url link
        this.cartId=res.params.cartId;

      })
  }

  // ^ Declare handleOnlinePayment(form) Function === this function when we click on pay online button will it call ^ //
  // & Form refer to shippingAddress form & //
  handleOnlinePayment(form:FormGroup){
    console.log("handle Online Payment", form);

    // el loading hy4t8l
    this.isLoading=true;

    if(form.valid==true){
      // ~ l method de hta5od cartId w values of form and will reply by url to complete online payment process ~ //
      this._cartService.generateOnlinePayment(this.cartId,form.value).subscribe({
        next:(res)=>{
          // console.log(res);
          // console.log(res.session.url);
          // * Go To This Url To Complete Payment Process * //
          window.location.href=res.session.url;

          // el loading m4 hy4t8l
          this.isLoading=false;
        }
      })
    }

    else{
      this.notValidForm=true;
    }

  }


  // ^ Declare handleCashPayment(form) Function === this function when we click on pay cash button will it call ^ //
  // & Form refer to shippingAddress form & //
  handleCashPayment(form:FormGroup){
    console.log("handle Cash Payment",form);

    // el loading hy4t8l
    this.loading=true;

    if(form.valid==true){
      // ~ l method de hta5od cartId w values of form and will reply by url to complete online payment process ~ //
      this._cartService.cashPayment(this.cartId,form.value).subscribe({
        next:(res)=>{
          // console.log(res);

          // el loading m4 hy4t8l
          this.loading=false;
          
        // ! Reset the value of numberItems after clear the cart ! //
        this._cartService.numberItems.next(0);

          this._router.navigate(['/allorders'])

        }
      })
    }

    else{
      this.notValidForm=true;
    }

  }


}
