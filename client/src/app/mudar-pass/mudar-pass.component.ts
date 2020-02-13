import { Component, OnInit } from '@angular/core';
import { LoginRequest, ChangePasswordRequest } from '../api_client';
import { AccountService } from '../api_client/api/account.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mudar-pass',
  templateUrl: './mudar-pass.component.html',
  styleUrls: ['./mudar-pass.component.scss']
})
export class MudarPassComponent implements OnInit {

  ResetForm = new FormGroup({
    email: new FormControl(),
  });
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  public doChangePass(event: Event) {
    const changePasswordRequest:ChangePasswordRequest={
      email: "email"
    };
    this.accountService.accountChangePasswordPost(changePasswordRequest)
  }
}
