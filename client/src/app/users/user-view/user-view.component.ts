import { Observable, Subject, SubscriptionLike } from 'rxjs';
import { filter, first, flatMap, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserViewComponent implements OnInit, OnDestroy {

  subscriptions: SubscriptionLike[];

  private refreshSubject = new Subject();
  private userIdSubject = new Subject();

  user$: Observable<Api.IUser>;


  /**
   * Constructor
   * @param router Router
   * @param snackBar Snackbar
   * @param userService User service
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService,
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
      shareReplay(1),
    );
  }

  ngOnDestroy(): void {
    (this.subscriptions || []).forEach(subscription => subscription.unsubscribe());
  }

  btnRefreshClicked(event: Event) {
    this.refreshSubject.next();
  }

  btnEmailClicked(event: Event) {
    // TODO:
  }

  btnEditClicked(event: Event) {
    this.user$.pipe(
      first(),
    ).subscribe({
      next: user => {
        this.router.navigate(['users', user.id, 'edit']);
      },
      error: error => this.snackBar.open(`Could not edit user. error=${error}`),
    });
  }

  btnDeleteClicked(event: Event) {
    this.user$.pipe(
      first(),
      flatMap(user => {
        this.snackBar.open(`Deleting user ${user.name}.`);
        return this.userService.deleteUserById(user.id).pipe(
          map(_ => user),
        );
      }),
    ).subscribe({
      next: user => {
        this.snackBar.open(`User ${user.name} deleted`);
        this.router.navigate(['users']);
      },
      error: (error: Api.IError) => this.snackBar.open(`Could not delete user. error=${error.message}`),
    });
  }
}
