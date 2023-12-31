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
    Name: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Established: new FormControl('', [Validators.required]),
    FloorArea: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
  });

  createStore() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

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
