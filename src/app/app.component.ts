import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth/auth.service';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';
import {Auth} from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{

  isLoggedIn$;
  user$: boolean;

  constructor(private authService: AuthService, private amplifyService: AmplifyService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn;

  }

  ngOnInit() {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.isLoggedIn$ = authState.state === 'signedIn';
        if (!authState.user) {
          this.user$= null;
        } else {
          this.user$ = authState.user;
        }
      });
  }


  onLogout() {
    Auth.signOut();
    this.router.navigate(['/login']);
  }
}
