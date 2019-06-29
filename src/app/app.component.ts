import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }


  onLogout() {
    this.authService.logout();                      // {3}
  }
}
