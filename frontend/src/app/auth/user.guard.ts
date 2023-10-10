import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from '../service/register.service';
@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private registerService:RegisterService, private router:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   
    console.log(route.routeConfig);
    if(route.routeConfig && (route.routeConfig.path == 'login' || route.routeConfig.path == 'signup') ){
      if(this.registerService.getToken()){
        this.router.navigate([''])
        return false
      }
      else{
        return true
      }
    }
    else{

      if(this.registerService.getToken() && this.registerService.getRole() == 'user'){
        return true;
      }
  
      if (this.registerService.navigationExtras && this.registerService.navigationExtras.state) {
        this.registerService.navigationExtras.state['data'] = "This route requires user authentication";
        this.router.navigate(['/alert'], this.registerService.navigationExtras)
      }
      return false;
    }
  }
}