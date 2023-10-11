import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private _cartService:CartService){}

  ngOnInit(): void {
    // this step to handle the number of items in cart (specially when i login with another user)
    this._cartService.getCart().subscribe({
      next:(res)=>{
        console.log("cart from nav",res);
        this._cartService.numberItems.next(res.numOfCartItems);
      },
      error: (err)=>{
        this._cartService.numberItems.next(0);
      }
    })
  }

}
