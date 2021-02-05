import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
  ]
})
export class MaterialModule { }
