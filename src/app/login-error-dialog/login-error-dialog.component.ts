import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-error-dialog',
  templateUrl: './login-error-dialog.component.html',
  styleUrls: ['./login-error-dialog.component.css']
})
export class LoginErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}