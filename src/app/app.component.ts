import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    UsersListComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-first-project';
}
