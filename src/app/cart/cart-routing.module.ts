import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { authGuard } from 'src/core/services/auth.guard';

const routes: Routes = [
  { path: '',  component:CartComponent , title:'cart'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
