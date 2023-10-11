import { AuthService } from 'src/core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrimPipe } from '../trim.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  isNotValidForm:boolean=false;
  errorMessage:string="";

constructor(private _authService:AuthService , private _router:Router){}
  // ^ Declare A Reactive Form ^ //
  forgetPasswordForm:FormGroup=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
})

// ^ Declare verify(form:FormGroup) Function === this function when we submit will it call ^ //
verify(form:FormGroup){
  console.log(form);

  // ^ Check Form is Valid OR Not ^ //
  if(form.valid==true){
    this.isNotValidForm=true;


    // ^ Calling A P I ^ //
    this._authService.forgetPassword(form.value).subscribe({
      next: (res)=>{
        console.log(res);

        // ? Go To verify-code Page ? //
        this._router.navigate(['/verifyCode']);

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
