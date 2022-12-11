import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './formDebug/formDebug.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';



@NgModule({
  declarations: [FormDebugComponent, CampoControlErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  exports: [
    FormDebugComponent,
    CampoControlErrorComponent
  ]
})
export class SharedModule { }
