import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.maxLength(50)]],
    email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: [null, [Validators.required, Validators.maxLength(50)]],
  });

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
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

  }


  onSubmit() {
    if (!this.userForm.dirty || !this.userForm.valid) {
      return;
    }
    const createData: Api.IUserCreateData = this.userForm.value;
    this.snackBar.open(`Creating user ${createData.name}.`);
    this.userService.createUser(createData).subscribe({
      next: this.handleUserCreateSuccess.bind(this),
      error: this.handleUserCreateError.bind(this),
    });
  }

  private handleUserCreateSuccess(user: Api.IUser) {
    this.snackBar.open(`User ${user.name} created`);
    this.router.navigate(['/', 'users']);
  }

  private handleUserCreateError(error: Api.IError) {
    this.snackBar.open(`Could not create user. error=${error.message}`);
  }

}
