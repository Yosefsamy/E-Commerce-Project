import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  categoryId:string="";
  categoryDetails:Category[]=[];


  constructor(private _productsService : ProductsService , private _activatedRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res:any)=>{


      this.categoryId=res.params.categoryId;
    })

    // & Calling getProductById(this.categoryId) Function == get details of product by his id & //
      this.getSpecificCategory(this.categoryId);
  }


    // ^ Declare getSpecificCategory(categoryId:string) Function === Get All SubCategories On Category -> A P I ^ //
    getSpecificCategory(id:string){
      this._productsService.getSpecificCategory(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.categoryDetails=res.data;
        }
      })
    }

}
