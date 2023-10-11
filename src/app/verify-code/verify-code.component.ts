import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {

  isNotValidForm:boolean=false;
  errorMessage:string="";


  constructor(private _authService:AuthService , private _router:Router){}
  // ^ Declare A Reactive Form ^ //
  resetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl("",[Validators.required,Validators.maxLength(6)]),
})

// ^ Declare verifyCode(form:FormGroup) Function === this function when we submit will it call ^ //
verifyCode(form:FormGroup){
  // console.log(form);

  // ^ Check Form is Valid OR Not ^ //
  if(form.valid==true){
    this.isNotValidForm=true;


    // ^ Calling A P I ^ //
    this._authService.verifyResetCode(form.value).subscribe({
      next: (res)=>{
        console.log(res);

        // ? Go To verify-code Page ? //
        this._router.navigate(['/resetPassword']);

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
