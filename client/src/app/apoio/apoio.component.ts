import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { flatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-apoio',
  templateUrl: './apoio.component.html',
  styleUrls: ['./apoio.component.scss']
})
export class ApoioComponent implements OnInit {

  supportForm = new FormGroup({
    to: new FormControl(),
    from: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
  }); 
    constructor(public auth: AuthService,     
      private httpClient: HttpClient,
      ) { }    
      ngOnInit() {   

      }       
        public doSupport() {
              this.auth.auth0Client$.pipe(
                flatMap(auth0Client => from(auth0Client.getTokenSilently())),
                take(1),
                flatMap(token => {
                  const supportForm = {
                    to: '',
                    from: 'tiagofnunes9@gmail.com',
                    subject: '',
                    text: '',
                  };
                  const res$ = this.httpClient.post(
                    'http://localhost:3000/api/sendmail',
                    supportForm,
                    { headers: {
                      Authorization: `Bearer ${token}`
                    }});
                    return res$;
                  }),
              ).subscribe({      
                next: res => console.log(res),
                error: res => console.error(res)
              });                
          }
}
