import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading:boolean=false;
  apiError:string="";
  isNotValidForm:boolean=false;


  constructor(private _authService : AuthService , private _router:Router){}

  // ^ Declare A Reactive Form ^ //
  loginForm:FormGroup=new FormGroup({

    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

    // ^ Declare login(form) Function === this function when we submit will it call ^ //
  // & Form refer to login form & //
  login(form:FormGroup){
    console.log(form);

    // ^ Check Form is Valid OR Not ^ //
    if(form.valid==true){

      // ^ Variable to handle Loading === Loading Will Appear ^ //

      this.loading=true;

      // ^ Calling A P I ^ //
      this._authService.login(form.value).subscribe({

        next:(result:any)=>{
          console.log(result);
          this.loading=false;

          // ? Add Token In Local Storage ? //
          localStorage.setItem("userToken",result.token);
          // & Call getUserData() Function & //
          this._authService.getUserData();

          // ? Go To Home Page ? //
          this._router.navigate(['/home']);

        },
        error:(err)=>{
          this.apiError=err.error.message;
          this.loading=false;
        }

      })
    }

    else{
      // ^ Variable to handle Error Message ^ //
      this.isNotValidForm=true;
    }
  }
}
