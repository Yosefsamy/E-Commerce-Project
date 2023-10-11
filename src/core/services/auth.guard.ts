import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// This Guard ruled that I did not enter any tab without login
export const authGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router);
  // ^ Check are there token or not in local storage == lw feh token yb2a hy3mal activate ^ //
  if(localStorage.getItem("userToken")){
    return true;
  }

  // ^ lw mfe4 token === navigate to login page ^ //
  else{
    _router.navigate(['\login']);
    return false;
  }

};
