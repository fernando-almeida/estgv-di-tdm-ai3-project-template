import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../api_client';
import { AccountService } from '../api_client/api/account.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-loginteste',
  templateUrl: './loginteste.component.html',
  styleUrls: ['./loginteste.component.scss']
})
export class LogintesteComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
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
