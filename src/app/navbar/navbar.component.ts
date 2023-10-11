import { AuthService } from 'src/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean=false;
  cartNumber:number=0;

  constructor(private _authService:AuthService , private _cartService:CartService){
    // * any change in userData will calling the logic which in subscribe method * //
    this._authService.userData.subscribe((res)=>{
      // ~ if user data has l token === logged in ~ //
      if( this._authService.userData.getValue()){

        //Logged In
        this.isLoggedIn=true;
        // console.log(this._authService.userData.getValue());
      }

      else{
        // Not Logged In
        this.isLoggedIn=false;
      }

    })

}


  ngOnInit(): void {

      this._cartService.numberItems.subscribe({
        next:(data)=>{
          // ~ any update in numberItems will happened in cartNumber ~ //
          this.cartNumber=data;
          // console.log("changing",this.cartNumber);

        }
      })

      // awl lma aft7 l page ala2y number of products in cart
      this._cartService.getCart().subscribe({
        next:(res)=>{
          console.log("cart from nav",res);
          this._cartService.numberItems.next(res.numOfCartItems);

        }
      })

  }

  

  // ^ Declare logOut() Function === When click on logOut it firing ^ //
  logOut(){
    // Call logOut Function in AuthService
    this._authService.logOut();
  }

}
