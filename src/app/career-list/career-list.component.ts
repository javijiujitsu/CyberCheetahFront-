import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';


import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { CareerServiceService } from '../services/career-service.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {
   currentUser: any = {};

    logoutError: string;

    careerArray: any[] = [];
    careerListError: string;

    isShowingForm: boolean = false;
    isShowingButton: boolean = false;

    careerInfo = {
    careerName: "",
    careerCertification: "",
    careerResource: ""
};

saveError: string;

myCoolUploader = new FileUploader({
  url: environment.apiBase + '/api/careers',
  itemAlias: 'careerPicture'
});

baseUrl = environment.apiBase;

  constructor(
    private authThang: AuthService,
    private careerThang: CareerServiceService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          this.getThemCareers();
          this.showCareerButton();
          console.log("user = ", this.currentUser);
          console.log("button = ", this.isShowingButton);
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
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

  getThemCareers() {
      this.careerThang.allCareers()
        .subscribe(
          (allTheCareers) => {
              this.careerArray = allTheCareers;
          },
          () => {
              this.careerListError = 'Sorry everybody. No careers today. 😱';
          }
        );
    } // close getThemCareers()

    showCareerForm() {
        if(this.currentUser.fullName === "Javier Buitrago"){
          this.isShowingForm = true;
        }
      } // close showCareerForm()

      showCareerButton() {
          console.log("full name = ", this.currentUser.fullName);
          if(this.currentUser.fullName === "Javier Buitrago"){
            this.isShowingButton = true;
          }
        } // close showCareerForm()

      saveNewCareer() {
      // if no picture, regular AJAX upload
      if (this.myCoolUploader.getNotUploadedItems().length === 0) {
        this.saveCareerNoPicture();
      }

      // else, upload pictures with uploader
      else {
        this.saveCareerWithPicture();
      }
    } // close saveNewCareer()

    private saveCareerNoPicture() {
        this.careerThang.newCareer(this.careerInfo)
          .subscribe(
            (newCareerFromApi) => {
                this.careerArray.push(newCareerFromApi);
                this.isShowingForm = false;
                this.careerInfo = {
                  careerName: "",
                  careerCertification: "",
                  careerResource: ""
                };
                this.saveError = "";
            },
            (err) => {
                this.saveError = 'Don\'t be a dumb Career';
            }
          );
      } // close saveCareerNoPicture

  private saveCareerWithPicture() {
    this.myCoolUploader.onBuildItemForm = (item, form) => {
        form.append('careerName', this.careerInfo.careerName);
        form.append('careerCertification', this.careerInfo.careerCertification);
        form.append('careerResource', this.careerInfo.careerResource);
    };

    this.myCoolUploader.onSuccessItem = (item, response) => {
        console.log(item);
        const newCareerFromApi = JSON.parse(response);
        this.careerArray.push(newCareerFromApi);
        this.isShowingForm = false;
        this.careerInfo = {
          careerName: "",
          careerCertification: "",
          careerResource: ""
        };
        this.saveError = "";
    };

    this.myCoolUploader.onErrorItem = (item, response) => {
        console.log(item, response);
        this.saveError = 'Don\'t be a dumb career';
    };

    // this is the function that initiates the AJAX request
    this.myCoolUploader.uploadAll();
  } // close saveCareerWithPicture




}
