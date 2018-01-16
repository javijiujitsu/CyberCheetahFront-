import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  isLoggedOut: boolean = false;

  signUpInfo = {
    fullName: '',
    email: '',
    password: ''
  };

  errorMessage: string;

  loginInfo = {
    email: '',
    password: ''
  };

  loginErrorMessage: string;


  constructor(
    private authThang: AuthService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      // If success, we are logged in.
      .then((resultFromApi) => {
          this.routerThang.navigate(['/home-page']);
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch((err) => {
          this.isLoggedOut = true;
      });
  }

  doSignUp() {
    this.authThang.signup(this.signUpInfo)
      .then((resultFromApi) => {
          // clear form
          this.signUpInfo = {
            fullName: '',
            email: '',
            password: ''
          };

          // clear error message
          this.errorMessage = "";

          // redirect to /camels
          this.routerThang.navigate(['/home-page']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.errorMessage = parsedError.message + ' did not work';
      });
  } // close doSignUp()

  doLogin() {
    this.authThang.login(this.loginInfo)
      .then((resultFromApi) => {
          // clear the form
          this.loginInfo = {
            email: '',
            password: ''
          };

          // clear the error message
          this.loginErrorMessage = "";

          // redirect to /camels
          this.routerThang.navigate(['/home-page']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.loginErrorMessage = parsedError.message + ' Went to shit';
      });
  } // close doLogin()

}
