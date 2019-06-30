import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoggedIn$;
  user$: boolean;

  constructor(private authService: AuthService, private amplifyService: AmplifyService, private router:Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn;

  }

  ngOnInit() {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.isLoggedIn$ = authState.state === 'signedIn';
        if (this.isLoggedIn$) {
          this.router.navigate(['/']);
        }
      });
  }

}
