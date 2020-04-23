import { NgModule } from '@angular/core';

import {
    MatButtonModule, 
    MatSnackBarModule
  } from '@angular/material';
  
  @NgModule({
    imports: [
      MatButtonModule, 
      MatSnackBarModule
    ],
    exports: [
      MatButtonModule,
      MatSnackBarModule
    ], 
    providers : [
      
    ]
  })
  export class MaterialModule {}