import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrl: './message-popup.component.scss',
  standalone: true,
  imports: [MatSnackBarLabel],
})
export class MessagePopupComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
