import { Component, OnInit } from '@angular/core';
import { AccountService } from '../api-client/api/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private accountService: AccountService,
  ) {
    // TODO: Get username and password from form and run this on user click of a button
    // accountService.accountLoginPost(username, password);
  }

  ngOnInit() {
  }

}