import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../models/User.type';
import { UserActions } from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface IUsersState extends EntityState<IUser> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: unknown;
}

export const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

const initialState: IUsersState = usersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const usersReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const })
  ),
  on(UserActions.loadUsersFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(UserActions.loadUsersFromLocalStorage, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const })
  ),

  on(UserActions.deleteUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UserActions.deleteUserSuccess, (state, { userId }) =>
    usersAdapter.removeOne(userId, { ...state, status: 'loaded' as const })
  ),
  on(UserActions.deleteUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(UserActions.addUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UserActions.addUserSuccess, (state, { userData }) =>
    usersAdapter.addOne(userData, { ...state, status: 'loaded' as const })
  ),
  on(UserActions.addUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(UserActions.editUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UserActions.editUserSuccess, (state, { userData }) =>
    usersAdapter.updateOne(userData, { ...state, status: 'loaded' as const })
  )
);
