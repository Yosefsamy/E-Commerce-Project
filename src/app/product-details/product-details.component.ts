import { WishListService } from './../wish-list.service';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:string="";
  productDetails:Product={} as Product;
  // property to hold the all Id of products in wishList
  wishListData:string[]=[];


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplayHoverPause:true,
    dotsSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  constructor(private _activatedRoute:ActivatedRoute,
     private _productsService:ProductsService,
     private _cartService:CartService,
     private _wishListService:WishListService,
     private _toastrService: ToastrService){

  }


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res:any)=>{
      // console.log(res.params.id);
      // * Get Id In Url to pass it a parameter in getProductById(id) Function * //
      this.productId=res.params.id;
      // console.log(this.productId);


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

    })

    // & Calling getProductById(this.productId) Function == get details of product by his id & //
      this.getProductById(this.productId);
  }


  // ^ Declare getProductById(productId) Function == Get Data of specific product by id from A P I ^ //
  getProductById(productId:string){
    this._productsService.getProductDetails(productId).subscribe((res)=>{
      console.log(res.data);
      // ~ kda l productDetails b2a 4ayl l data from A P I ~ //
      this.productDetails=res.data;
    })

  }


    // ^ Declare addProductToCart(product.id) Function === Add Product To A P I ^ //
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
    // this.colorChange=this._wishListService.changeColor;
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
        // this.colorChange=true;


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
