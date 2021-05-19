import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PasswordValidator } from 'shared';

@Component({
  selector: 'sw-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  passwordControl: FormControl = new FormControl();
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) {
  }

  close(): void {
    this.dialogRef.close();
  }

  ok(): void {
    if (this.passwordControl.value) {
      this.dialogRef.close(this.passwordControl.value);
      return;
    }
    this.errorMessage = '비밀번호를 입력해주세요.';
  }

  ngOnInit(): void {
    this._subscription = this.passwordControl.valueChanges.subscribe(() => this.errorMessage = null);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
