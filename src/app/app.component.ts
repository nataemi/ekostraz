import {Component, OnInit} from '@angular/core';
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

  loggedIn;

  constructor(private authService: AuthService, private amplifyService: AmplifyService, private router: Router) {

  }

  ngOnInit() {
     this.amplifyService.auth().currentAuthenticatedUser()
      .then(user => {
        this.loggedIn = true;
        console.log(this.loggedIn);
      })
      .catch(err => {
        this.loggedIn = false;
        console.log(this.loggedIn);
      });
  }


  onLogout() {
    Auth.signOut();
    this.router.navigate(['/login']);
  }
}
