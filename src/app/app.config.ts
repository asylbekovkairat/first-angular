import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import * as UsersEffects from './store/users.effects';
import { USERS_FEATURE_KEY, usersReducer } from './store/users.reducer';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const USERS_API = new InjectionToken<string>('USERS_API');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    { provide: USERS_API, useValue: 'https://jsonplaceholder.typicode.com' },
    provideAnimations(),
    provideHttpClient(),
    provideEffects(UsersEffects),
    provideStore({
      [USERS_FEATURE_KEY]: usersReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
