import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-store-dialog',
  templateUrl: './create-store-dialog.component.html',
  styleUrl: './create-store-dialog.component.scss',
})
export class CreateStoreDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateStoreDialogComponent>) {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    established: new FormControl('', [Validators.required]),
    floorArea: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
  });

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName) as FormControl;
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    if (control.hasError('minlength') || control.hasError('maxlength')) {
      return 'Number must contain 13 characters';
    }
    return '';
  }
}
