import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthenticationControllerService} from "./services/services/authentication-controller.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Test';
  isLoggedIn = false;
  username: any;


  constructor(private router: Router, private authService: AuthenticationControllerService) {}

  ngOnInit() {
    // Check the authentication status on component initialization
    this.isLoggedIn = this.authService.isLoggedIn()
    this.username= this.authService.userName;

    // Subscribe to router events to update authentication status on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
