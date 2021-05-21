import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
  
  @NgModule({
    imports: [
      MatButtonModule, 
      MatSnackBarModule, 
      MatProgressSpinnerModule
    ],
    exports: [
      MatButtonModule,
      MatSnackBarModule,
      MatProgressSpinnerModule

    ], 
    providers : [
      
    ]
  })
  export class MaterialModule {}