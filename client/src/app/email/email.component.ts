import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { tap, flatMap, take } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  constructor(
    
    private auth: AuthService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
  }

  sendEmail() {
    this.auth.auth0Client$.pipe(
      flatMap(auth0Client => from(auth0Client.getTokenSilently())),
      take(1),
      flatMap(token => {
        const sendEmailData = {
          to: 'tiagofnunes9@gmail.com',
          from: 'test@example.com',
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        const res$ = this.httpClient.post(
          'http://localhost:3000/api/sendmail',
          sendEmailData,
          { headers: {
            Authorization: `Bearer ${token}`
          }});
          return res$;
        }),
    ).subscribe({
      next: res => console.log(res),
      error: res => console.error(res)
    });

    // using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs


}
}