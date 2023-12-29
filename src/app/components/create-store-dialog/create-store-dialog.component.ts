import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-store-dialog',
  templateUrl: './create-store-dialog.component.html',
  styleUrl: './create-store-dialog.component.scss',
})
export class CreateStoreDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateStoreDialogComponent>) {}
  name = new FormControl('', [Validators.required]);

  getErrorMessage(): any {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
  }
}
