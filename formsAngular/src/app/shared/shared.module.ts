import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './formDebug/formDebug.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [FormDebugComponent, CampoControlErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  exports: [
    FormDebugComponent,
    CampoControlErrorComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
