import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  loading:boolean=false;
  apiError:string="";
  isNotValidForm:boolean=false;

  constructor(private _authService : AuthService , private _router:Router){}

  // ^ Declare A Reactive Form ^ //
  registerForm:FormGroup=new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl("",[Validators.required, Validators.pattern(/^\w{6,}$/)]),
    phone:new FormControl("",[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },
  {
    validators:this.validateRePassword
  })

  // ^ Declare register(form) Function === this function when we submit will it call ^ //
  // & Form refer to register form & //
  register(form:FormGroup){
    console.log(form);

    // ^ Check Form is Valid OR Not ^ //
    if(form.valid==true){

      // ^ Variable to handle Loading === Loading Will Appear ^ //
      this.loading=true;

      this._authService.register(form.value).subscribe({

        next:(result:any)=>{
          console.log(result);
          this.loading=false;
          // ? Go To Login Page ? //
          this._router.navigate(['/login']);
          // console.log(this.isNotValidForm);

        },
        error:(err)=>{
          console.log(err);
          // err.error.errors.msg == when password and rePassword not match
          // err.error.message == when email is already exists
          this.apiError=err.error.errors? err.error.errors.msg : err.error.message;
          // this.apiError=err.error.message;
          this.loading=false;
        }

      })
    }

    else{
      this.isNotValidForm=true;
    }
  }


  // ^ Declare validateRePassword(registerForm:any) Function === this function will check the validation of password = rePassword ^ //
  validateRePassword(registerForm:any){
    // hold l password control fe variable
    let passwordControl=registerForm.get('password');
    // hold l password control fe variable
    let rePasswordControl=registerForm.get('rePassword');

    if(passwordControl?.value == rePasswordControl?.value){
      // In Case Valid 
      return null;
    }
    else{
      // ! Set New Error In rePassword Errors ! //
      rePasswordControl?.setErrors({rePasswordNotMatch : "Password And RePassword Should Be Matched"})
      return {rePasswordNotMatch : "Password And RePassword Should Be Matched"};
    }
  }

}
