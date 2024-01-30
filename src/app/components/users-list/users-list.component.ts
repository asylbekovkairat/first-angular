import { UsersApiService } from '../../services/users-api.service';
import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../models/User.type';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgFor } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/users.service';
const console: Console = window.console;

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  imports: [UserCardComponent, NgFor, AsyncPipe, MatButtonModule],
})
export class UsersListComponent implements OnInit {
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);
  private dialog = inject(MatDialog);
  public usersService = inject(UsersService);

  constructor(
    usersApiService: UsersApiService,
    usersService: UsersService,
    dialog: MatDialog,
    localStorageService: LocalStorageService
  ) {
    this.usersApiService = usersApiService;
    this.usersService = usersService;
    this.dialog = dialog;
    this.localStorageService = localStorageService;
  }

  saveUserInLocalStorage(users: IUser[]) {
    this.localStorageService.saveUsers(users);
  }

  ngOnInit() {
    const users = this.localStorageService.getUsers();

    if (users) {
      this.usersService.users = JSON.parse(users);
    } else {
      this.usersApiService.getUsers().subscribe(
        (users: IUser[]) => {
          this.usersService.users = users;
          this.saveUserInLocalStorage(users);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const createdUser = {
        ...result,
        company: {
          name: result.companyName,
        },
      };

      this.usersService.saveNewUser(createdUser);
      this.saveUserInLocalStorage(createdUser);
    });
  }

  openEditModal(user: IUser): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const editedUser = {
        ...result,
        company: {
          name: result.companyName,
        },
      };
      this.usersService.editUser(editedUser);
      this.saveUserInLocalStorage(editedUser);
    });
  }

  deleteUser(deleteUserId: number): void {
    this.usersService.deleteUser(deleteUserId);
    this.saveUserInLocalStorage(this.usersService.users);
  }
}
