import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../category';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  allCategories:Category[]=[];

  constructor(private _productsService : ProductsService){}

  ngOnInit(): void {
    // & Calling getCategories() Function == get Categories & //
    this.getCategories();
  }


    // ^ Declare getCategories() Function == Get All Categories from A P I ^ //
  getCategories(){
    this._productsService.getCategories().subscribe({
      next:(res)=>{
        console.log(res);
        // ~ kda l allCategories b2a 4ayl l data from A P I ~ //
        this.allCategories=res.data;
      }
    })
  }


}
