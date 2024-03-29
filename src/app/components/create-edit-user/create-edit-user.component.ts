import { ButtonType } from './../../models/ButtonType-enum.model';
import { MatInputModule } from '@angular/material/input';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../models/User.type';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css',
})
export class CreateEditUserComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  public buttonTitle: ButtonType = ButtonType.CREATE;
  public userForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: IUser) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(new Date().getSeconds()),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{2,3}[-\s\.]?[0-9]{2,8}$/
        ),
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    if (this.data) {
      this.userForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone,
        companyName: this.data.company.name,
      });
      this.buttonTitle = ButtonType.EDIT;
    }
  }

  onSubmit() {
    this.dialogRef.close(this.userForm.value);
  }
}
