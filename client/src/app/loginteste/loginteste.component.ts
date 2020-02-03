import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../api_client';
import { AccountService } from '../api_client/api/account.service';

@Component({
  selector: 'app-loginteste',
  templateUrl: './loginteste.component.html',
  styleUrls: ['./loginteste.component.scss']
})
export class LogintesteComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    ) { }

  ngOnInit() {
  }

  public doLogin(event: Event) {
    const loginRequest: LoginRequest = {
      password: "password",
      email: "email"
    };
    this.accountService.accountLoginPost(loginRequest)
    
  }
}
