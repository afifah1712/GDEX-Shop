import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data.role;

    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigateByUrl('/login');
          return false;
        } else {
          let role = user['role'];
          if (expectedRole.includes(role) ) {
            return true;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        }
      })
    )
  }
}
