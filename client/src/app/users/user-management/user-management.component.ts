import { Observable, Subject } from 'rxjs';
import { flatMap, startWith } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  userFilterFormControl = new FormControl({
    searchText: null,
    nameContains: null,
    emailContains: null
  } as Api.IUserFilter);

  users$: Observable<Api.IUser[]>;

  private userFilterSubject = new Subject<Api.IUserFilter>();

  /**
   * Constructor
   * @param userService User service
   * @param snackBar Snack bar
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.users$ = this.userFilterSubject.asObservable().pipe(
      startWith(undefined),
      flatMap(userFilter => this.userService.listUsers(userFilter)),
    );
  }

  onSearch(userFilter: Api.IUserFilter) {
    this.userFilterSubject.next(userFilter);
  }

  onRefresh(userFilter: Api.IUserFilter) {
    this.userFilterSubject.next(userFilter);
  }

  btnCreateUserClicked(event: Event) {
    this.router.navigate(['/', 'users', 'create']);
  }

}
