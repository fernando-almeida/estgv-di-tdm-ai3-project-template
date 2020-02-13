import { Observable, Subject } from 'rxjs';
import { filter, flatMap, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<Api.IUser>;

  userForm = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
  });

  private refreshSubject = new Subject();

  /**
   * Constructor
   * @param router Router
   * @param activatedRoute Activated route
   * @param formBuilder Form builder
   * @param userService User service
   * @param snackBar Snack bar
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.user$ = this.refreshSubject.asObservable().pipe(
      startWith(true),
      switchMap(_ => {
        return this.activatedRoute.params.pipe(
          filter(params => params.id && !isNaN(parseInt(params.id, 10))));
      }),
      map(params => parseInt(params.id, 10)),
      flatMap(userId => this.userService.getUserById(userId)),
      tap(user => {
        this.userForm.setValue({
          name: user.name,
          email: user.email,
        });
      }),
      shareReplay(1),
    );
  }


  onSubmit() {
    if (!this.userForm.dirty) {
      return;
    }
    this.user$.pipe(
      flatMap(user => {
        const userUpdateData: Api.IUserUpdateData = this.userForm.value;
        this.snackBar.open(`Updating user ${user.name}.`);
        return this.userService.updateUserById(user.id, userUpdateData);
      }),
    ).subscribe({
      next: this.handleUserUpdateSuccess.bind(this),
      error: this.handleUserUpdateError.bind(this),
    });
  }

  private handleUserUpdateSuccess(user: Api.IUser) {
    this.snackBar.open(`User ${user.name} updated`);
    this.router.navigate(['/', 'users']);
  }

  private handleUserUpdateError(error: Api.IError) {
    this.snackBar.open(`Could not update user. error=${error.message}`);
  }

}
