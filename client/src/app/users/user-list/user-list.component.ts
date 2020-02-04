import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


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

  btnDeleteClicked(options: SelectionModel<MatListOption>) {
    // TODO: Delete all selected users
    this.snackBar.open('Bulk delete not implemented');
  }
}
