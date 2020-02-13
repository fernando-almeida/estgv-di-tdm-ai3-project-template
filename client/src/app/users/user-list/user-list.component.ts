import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {

  @Input() users$: Observable<Api.IUser[]>;

  /**
   * Constructor
   * @param router Router
   * @param snackBar Snackbar
   */
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    if (!this.users$) {
      throw new Error('Users must be specified');
    }
  }

  btnDeleteClicked(options: MatOption[]) {
    // TODO: Delete all selected users
    this.snackBar.open('Bulk delete not implemented');
  }
}
