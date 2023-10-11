import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

  allProduct:Product[]=[];
  searchKey:string="";

  constructor(private _productsService:ProductsService){}

  ngOnInit(): void {

    // & call Function & //
    this.getAllProducts();
  }

  // ^ Declare getAllProducts() Function === 3l4an a3ml call l API function from service ^ //
  getAllProducts(){
    this._productsService.getProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.allProduct=res.data
        console.log("allProducts :",this.allProduct);
      }

    })
  }

}
