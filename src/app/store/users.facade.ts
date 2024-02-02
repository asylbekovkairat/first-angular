import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from './users.actions';
import { IUser } from '../models/User.type';
import * as UsersSelectors from './users.selector';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly store = inject(Store);

  public readonly users$ = this.store.select(UsersSelectors.selectUsersState);
  public readonly status$ = this.store.select(UsersSelectors.selectUsersStatus);
  public readonly error$ = this.store.select(UsersSelectors.selectUsersError);

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  addUser(userData: IUser) {
    this.store.dispatch(UserActions.addUser({ userData }));
  }

  editUser(user: IUser) {
    this.store.dispatch(
      UserActions.editUser({ userData: { id: user.id, changes: user } })
    );
  }
}
