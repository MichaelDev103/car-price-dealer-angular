import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutGalvesComponent } from '../modals/about-galves/about-galves.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public matDialog: MatDialog,
  ) { }

  openAbout() {
    this.matDialog.open(
      AboutGalvesComponent,
      {
        width: "600px",
        data: {}
      }
    );
  }
}
