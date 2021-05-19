import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sw-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.scss']
})
export class PrivacyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrivacyDialogComponent>) {
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
