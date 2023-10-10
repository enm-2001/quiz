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
export class AdminGuard implements CanActivate {
  constructor(private registerService:RegisterService, private router:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // throw new Error('Method not implemented.');
    if(this.registerService.getToken() && this.registerService.getRole() == 'admin'){
      return true;
    }

    if (this.registerService.navigationExtras && this.registerService.navigationExtras.state) {
      this.registerService.navigationExtras.state['data'] = "This route requires admin authentication";
      this.router.navigate(['/alert'], this.registerService.navigationExtras)
    }
    return false;
  }
}