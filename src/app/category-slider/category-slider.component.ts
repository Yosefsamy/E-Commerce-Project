import { Component } from '@angular/core';
import { Category } from '../category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent {

  allCategories:Category[]=[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin:15,
    navText: ['', ''],
    responsive: {
      0: {
        items:2
      },
      600: {
        items:4
      },
      768: {
        items:6
      },
      992: {
        items:8
      }
    },
    nav: true
  }

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
