import { Injectable } from '@angular/core';
import { IUser } from '../models/User.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = [];

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  saveNewUser(userData: IUser) {
    this.users = [...this.users, userData];
  }

  editUser(userData: IUser) {
    const editedUsers = this.users.map((user) =>
      user.id === userData.id ? userData : user
    );
    this.users = editedUsers;
    return editedUsers;
  }
}
