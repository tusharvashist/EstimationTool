import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';


const materialModules = [ 
  MatButtonModule,
  MatCardModule,  
  MatInputModule,  
  MatMenuModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatGridListModule,
];

@NgModule({
  imports: [
    CommonModule,
    materialModules
  ],
  exports: [
    materialModules
  ],
})

export class AngularMaterialModule { }