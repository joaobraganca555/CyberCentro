import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class JwtClientGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //var token = JSON.parse(localStorage.getItem('token') || '{}');
    discor
    if (this.sessionService.isClient()) {
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
