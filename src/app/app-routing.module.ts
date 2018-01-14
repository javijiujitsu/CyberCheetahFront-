import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerListComponent } from './career-list/career-list.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [

  { path: '', component: AuthPageComponent },
  { path: 'careers', component: CareerListComponent },
  { path: '**', component: NotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
