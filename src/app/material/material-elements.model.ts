import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatListModule
} from '@angular/material';

const modules = [
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatListModule
];

@NgModule({
  imports: [ ...modules ],
  exports: [ ...modules ]
})
export class MaterialElementsModule { }
