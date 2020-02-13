import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterRequest } from '../api_client';
import { AccountService } from '../api_client/api/account.service';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.scss']
})
export class RegistarComponent implements OnInit {

  registerForm = new FormGroup({
    givenName: new FormControl(),
    familyName: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }


  public onRegistar(event: Event) {

    const RegisterRequest: RegisterRequest = {
      givenName:"givenName",
      familyName:"familyName",
      username:"username",
      password: "password",
      email: "email"
    };
    this.accountService.accountRegisterPost(RegisterRequest)
    
  }
  function (err) {
    if (err) return alert('Erro: ' + err.message);
    return alert('Sucesso')
  }
}