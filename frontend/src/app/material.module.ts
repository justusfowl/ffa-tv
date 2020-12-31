import { NgModule } from '@angular/core';

import {
    MatButtonModule, 
    MatSnackBarModule,
    MatProgressSpinnerModule
  } from '@angular/material';
  
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