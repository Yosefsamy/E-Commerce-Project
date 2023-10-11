import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authDeActivateGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router);

  if(localStorage.getItem('userToken')){
    // console.log(localStorage.getItem('userToken'));

    _router.navigate(['/home']);
    return false;
  }
  else{
    return true;
  }

};
