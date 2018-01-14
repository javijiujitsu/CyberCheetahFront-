import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class CareerServiceService {

  constructor(
      private httpThang: Http
    ) { }

    newCareer(componentInfo) {
          return this.httpThang
            .post(
              `${environment.apiBase}/api/careers`,

              // Form body information to send to the back end (req.body)
              componentInfo,

              // Send the cookies across domains
              { withCredentials: true }
            )

            // Parse the JSON
            .map(res => res.json());
      } // close newCareer()

      allCareers() {
           return this.httpThang
             .get(
               `${environment.apiBase}/api/careers`,

               // Send the cookies across domains
               { withCredentials: true }
             )

             // Parse the JSON
             .map(res => res.json());
       } // close allCareers()



}
