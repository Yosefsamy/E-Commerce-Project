import { Component, OnInit } from '@angular/core';
import { WishList } from './interfaces/wish-list';
import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishlistDetails: WishList={} as WishList;

  constructor(private _wishListService : WishListService ,
     private _cartService : CartService ,
     private _toastrService:ToastrService){}

ngOnInit(): void {
    // ~ Call getWishlist() Function ~ //
    this.getWishlist();
}

    // ^ Declare getWishlist() Function === Get Logged User wishList -> A P I (GET method) ^ //
    getWishlist(){
      this._wishListService.getWishlist().subscribe({
        next:(res)=>{
        // console.log("data in wishList",res);
          this.wishlistDetails=res;
        }
      })
    }

     // ^ Declare deleteItem(id:string) Function ===Delete Item From wishList -> A P I (DELETE method) ^ //
    deleteItem(id:string){
      this._wishListService.deleteItem(id).subscribe({
        next:(res)=>{
          // console.log(res);
          // * Call getWishlist() Function -> 3l4an y7sl update l products * //
          this.getWishlist();
        }
      })

    }

    addToCart(id:string){
      this._cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log("added",res);
           // & print the response message & //
        // toaster
        this._toastrService.success(res.message);

        // lma add item l numberItems increase
        this._cartService.numberItems.next(res.numOfCartItems);
        // console.log(this._cartService.numberItems);

        }
      })
    }


}
