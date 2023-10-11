import { AllordersComponent } from './allorders/allorders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from 'src/core/services/auth.guard';
import { authDeActivateGuard } from 'src/core/services/auth-de-activate.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';


const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:'home' , canActivate:[authGuard] , component:HomeComponent,title:'home'},
  {path:'products' , canActivate:[authGuard] , component:ProductsComponent,title:'products'},
  {path:'brands' , canActivate:[authGuard] , component:BrandsComponent,title:'brands'},
  {path:'categories' , canActivate:[authGuard] , component:CategoriesComponent,title:'categories'},
  {path:'categoryDetails/:categoryId' , canActivate:[authGuard] , component:CategoryDetailsComponent,title:'category-Details'},
  {path:'productDetails/:id' , canActivate:[authGuard] , component:ProductDetailsComponent,title:'product details'},
  {path:'checkout/:cartId' , canActivate:[authGuard] , component:CheckOutComponent,title:'checkout'},
  {path:'allorders' , canActivate:[authGuard] , component:AllordersComponent,title:'allOrders'},
  {path:'signup' , canActivate:[authDeActivateGuard] , component:SignupComponent,title:'signup'},
  {path:'login' , canActivate:[authDeActivateGuard] , component:LoginComponent,title:'login'},
  {path:'forgetPassword' , canActivate:[authDeActivateGuard] , component:ForgetPasswordComponent,title:'forget-password'},
  {path:'verifyCode' , canActivate:[authDeActivateGuard] , component:VerifyCodeComponent,title:'verify-code'},
  {path:'resetPassword' , canActivate:[authDeActivateGuard] , component:ResetPasswordComponent,title:'reset-password'},
  { path: 'cart', canActivate:[authGuard], loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'wishList' , canActivate:[authGuard] , loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule) },



  {path:'**',component:NotfoundComponent,title:'not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
