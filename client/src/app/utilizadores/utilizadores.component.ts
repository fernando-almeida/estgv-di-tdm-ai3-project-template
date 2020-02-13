import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './utilizadores.component.html',
  styleUrls: ['./utilizadores.component.scss']
})
export class UtilizadoresComponent implements OnInit {
  profile:any
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}