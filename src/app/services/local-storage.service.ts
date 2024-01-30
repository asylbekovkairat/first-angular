import { Injectable } from '@angular/core';
import { IUser } from '../models/User.type';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getUsers() {
    return localStorage.getItem('users') || null;
  }

  saveUsers(users: IUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
}
