import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {

  currentUser: any = {};

  logoutError: string;

  baseUrl = environment.apiBase;


  constructor(
    private authThang: AuthService ,
    private routerThang: Router
  ) { }

  ngOnInit() {
     this.authThang.checklogin()
       .then((userFromApi) => {
           this.currentUser = userFromApi;
       })
       .catch(() => {
           this.routerThang.navigate(['/careers']);
       });
   } // close ngOnInit()

  logMeOutPls() {
    this.authThang.logout()
      .then(() => {
          this.routerThang.navigate(['/']);
      })
      .catch(() => {
          this.logoutError = 'Log out went to 💩';
      });
  } // close logMeOutPls()


}
