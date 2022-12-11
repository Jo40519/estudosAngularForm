import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormtComponent } from './data-formt.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DataFormtComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class DataFormtModule { }
