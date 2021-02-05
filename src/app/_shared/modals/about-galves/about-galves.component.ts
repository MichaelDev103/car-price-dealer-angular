import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-about-galves',
  templateUrl: './about-galves.component.html',
  styleUrls: ['./about-galves.component.scss']
})
export class AboutGalvesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AboutGalvesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
