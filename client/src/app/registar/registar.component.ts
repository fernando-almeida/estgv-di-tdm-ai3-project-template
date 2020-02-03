import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.scss']
})
export class RegistarComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor() { }

  ngOnInit() {
  }


  onRegistar() {
  }
}
