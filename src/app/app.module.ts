import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from "ng2-file-upload";


//!--SERVICE
import { AuthService } from './services/auth.service';
//!---------

import { AppRoutingModule } from './app-routing.module';

//--COMPONENTS
import { AppComponent } from './app.component';
import { CareerListComponent } from './career-list/career-list.component';
import { AuthPageComponent  } from './auth-page/auth-page.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    CareerListComponent,
    AuthPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FileUploadModule,


  ],
  providers: [
  AuthService

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
