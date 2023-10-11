import { Router } from '@angular/router';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { CartDetails } from './interfaces/cart-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails: CartDetails={} as CartDetails;
  notCart:boolean=false;

  constructor(
    private _cartService:CartService , private _router:Router) {}

  ngOnInit(): void {
    // * Call getCart() Function * //
    this.getCart();
  }

  // ^ Declare getCart() Function === Get Logged User Cart  A P I (GET method) ^ //
  getCart(){
    this._cartService.getCart().subscribe({
      next:(res)=>{
      // console.log("data from api",res);
        this.cartDetails=res;
        this.notCart=false;
      },
      error:(err)=>{
        console.log(err);
        this.notCart=true;
      }
    })
  }



    // ^ Declare deleteItem(id:string) Function ===Delete Item From A P I (DELETE method) ^ //
    deleteItem(id:string){
      this._cartService.deleteItem(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartDetails=res;
          this._cartService.numberItems.next(res.numOfCartItems);
        }
      })
    }



  // ^ Declare updateCount(count:number , id:string) Function === Update Count At Cart (PUT method) ^ //
  updateCount(count:number , id:string){

    // ~ lw el count > 0 hy3ml update 3ady + or - ~ //
    if(count>0){
      this._cartService.updateProductCount(count,id).subscribe({
        next:(res)=>{
          console.log("update",res);
          this.cartDetails=res;
        }
      })
    }

    // ~ lw el count == 0 delete the item from the cart ~ //
    else{
      // ! Call deleteItem(id) Function ! //
      this.deleteItem(id);
    }

  }



  // ^ Declare clearUserCart() Function === clear user cart (DELETE method) ^ //
  clearUserCart(){
    this._cartService.clearCart().subscribe({
      next:(res)=>{
        // console.log(res);
        // ! Reset the value of numberItems after clear the cart ! //
        this._cartService.numberItems.next(0);

        // * navigate to home page after clear the cart * //
        this._router.navigate(['/home']);

      }
    })
  }


}
