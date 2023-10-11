import { WishListService } from '../wish-list.service';
import { WishList } from '../wish-list/interfaces/wish-list';
import { CartService } from './../cart.service';
import { Product } from './../product';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{

  // property to hold the all Id of products in wishList
  wishListData:string[]=[];

  constructor(
    private _cartService : CartService,
    private _wishListService : WishListService,
    private _toastrService: ToastrService
    ){}

  ngOnInit(): void {

    // * lma a3ml refresh still l products with fav icons * //
    this._wishListService.getWishlist().subscribe({
      next:(res)=>{
        // console.log("response",res);

        // ! Y7wl l Array Of Object to Array Of String (collection of ID) ! //
        const newData=res.data.map((item:any)=>item._id);
        this._wishListService.wishListArray=newData;
        this.wishListData=this._wishListService.wishListArray;
        // console.log("newData",this.wishLitData);

      }
    })

  }


  @Input()product:Product={} as Product;


  // ^ Declare addProductToCart(product.id) Function === Add Product To Cart  -> A P I (POST method) ^ //
  addProductToCart(id:string){
    this._cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        // & print the response message & //
        // toaster
        this._toastrService.success(res.message);

        // lma add item l numberItems increase
        this._cartService.numberItems.next(res.numOfCartItems);
        // console.log(this._cartService.numberItems);

      }
    })

  }

   // ^ Declare addProductToWishlist(id) Function === Add Product To Wish List  -> A P I (POST method) ^ //
   addProductToWishlist(id:string){
    this._wishListService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        // console.log(res);
        // * add l new product to wishListData (Array) * //
        this._wishListService.wishListArray=res.data;
        this.wishListData=this._wishListService.wishListArray;
        // console.log(this.wishListData);

        // & print the response message & //
        // toaster
        this._toastrService.success(res.message);
      }
    })

  }

  // ^ Declare deleteProductFromWishlist(id:string) Function ===Delete Item From wishList -> A P I (DELETE method) ^ //
  deleteProductFromWishlist(id:string){
    this._wishListService.deleteItem(id).subscribe({
      next:(res)=>{
        // console.log(res);

       // * delete product from wishListData (Array) * //
       this._wishListService.wishListArray=res.data;
       this.wishListData=this._wishListService.wishListArray;
       // console.log(this.wishListData);

       // & print the response message & //
       // toaster
       this._toastrService.success(res.message);

      }
    })

  }



}
