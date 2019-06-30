import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

import { AuthService } from './auth.service';
import {AmplifyService} from 'aws-amplify-angular';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private amplifyService: AmplifyService
  ) { }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return this.amplifyService.auth().currentAuthenticatedUser()
      .then(user => true)
      .catch(err => {
        this.router.navigate(['/login']);
        return false;
      });
  }

}
