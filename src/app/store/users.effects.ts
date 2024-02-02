import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserActions } from './users.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersApiService } from '../services/users-api.service';
import { LocaleStorageService } from '../services/local-storage.service';
import { IUser } from '../models/User.type';

export const loadUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => {
        return userLocaleStorageService.getUsers()
          ? of(
              UserActions.loadUsersFromLocalStorage({
                users: userLocaleStorageService.getUsers()!,
              })
            )
          : userAPIService.getUsers().pipe(
              map((users: IUser[]) => {
                userLocaleStorageService.setUsers(users);
                return UserActions.loadUsersSuccess({
                  users: users,
                });
              }),
              catchError((error) => {
                return of(UserActions.loadUsersFailed({ error }));
              })
            );
      })
    );
  },
  { functional: true }
);

export const deleteUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ userId }) =>
        userAPIService.deleteUser(userId).pipe(
          map(() => {
            userLocaleStorageService.removeUser(userId);
            return UserActions.deleteUserSuccess({ userId });
          }),
          catchError((error) => of(UserActions.deleteUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const addUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({ userData }) =>
        userAPIService.addUser(userData).pipe(
          map(() => {
            userLocaleStorageService.addUser(userData);
            return UserActions.addUserSuccess({ userData });
          }),
          catchError((error) => of(UserActions.addUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UsersApiService);
    const userLocaleStorageService = inject(LocaleStorageService);

    return actions$.pipe(
      ofType(UserActions.editUser),
      switchMap(({ userData }) =>
        userAPIService.editUser(userData.changes).pipe(
          map(() => {
            userLocaleStorageService.editUser(userData.changes);
            return UserActions.editUserSuccess({ userData });
          }),
          catchError((error) => of(UserActions.editUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);
