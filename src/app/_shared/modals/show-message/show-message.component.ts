import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  buttons: any;

  constructor(
    public dialogRef: MatDialogRef<ShowMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('data ===> ', this.data);
    this.buttons = this.data?.buttons;
  }

  ok(): void {
    this.dialogRef.close();
  }
}
