import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../models/User.type';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { UsersService } from '../../services/users.service';
import { UsersFacade } from '../../store/users.facade';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  imports: [
    UserCardComponent,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    NgIf,
    MatProgressBarModule,
  ],
})
export class UsersListComponent implements OnInit {
  private dialog = inject(MatDialog);
  public usersService = inject(UsersService);
  public usersFacade = inject(UsersFacade);

  public users$ = this.usersFacade.users$;
  public status$ = this.usersFacade.status$;
  public error$ = this.usersFacade.error$;

  ngOnInit() {
    this.usersFacade.loadUsers();
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
      if (result) this.usersFacade.addUser(createdUser);
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
      if (result) this.usersFacade.editUser(editedUser);
    });
  }

  deleteUser(deleteUserId: number): void {
    this.usersFacade.deleteUser(deleteUserId);
  }
}
