import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  isNotValidForm:boolean=false;
  errorMessage:string="";


  constructor(private _authService:AuthService , private _router:Router){}
  // ^ Declare A Reactive Form ^ //
  resetPasswordForm:FormGroup=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    newPassword:new FormControl("",[Validators.required, Validators.pattern(/^\w{6,}$/)])
})

// ^ Declare verifyCode(form:FormGroup) Function === this function when we submit will it call ^ //
resetPassword(form:FormGroup){
  // console.log(form);

  // ^ Check Form is Valid OR Not ^ //
  if(form.valid==true){
    this.isNotValidForm=true;


    // ^ Calling A P I ^ //
    this._authService.resetPassword(form.value).subscribe({
      next: (res)=>{
        // console.log(res);

        // ? Add Token In Local Storage ? //
        localStorage.setItem("userToken",res.token);
        // & Call getUserData() Function & //
        this._authService.getUserData();

        // ? Go To Home Page ? //
        this._router.navigate(['/home']);

      },
      error: (err)=>{
        // console.log(err.error.message);

        this.errorMessage=err.error.message ;
      }
    })
  }

  else{
    this.isNotValidForm=true;
  }


}
}
