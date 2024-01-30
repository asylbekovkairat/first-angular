import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../models/User.type';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<IUser>();

  deleteUser() {
    this.delete.emit(this.user.id);
  }

  openEditCard() {
    this.edit.emit(this.user);
  }
}
