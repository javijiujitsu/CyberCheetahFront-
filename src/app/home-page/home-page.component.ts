import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  logoutError: string;


  constructor(
   private authThang: AuthService,
   private routerThang: Router
  ) { }

  ngOnInit() {

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
