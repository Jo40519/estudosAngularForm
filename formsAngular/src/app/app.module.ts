import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormtComponent } from './data-formt/data-formt.component';
import { FormsModule } from '@angular/forms';
import { FormDebugComponent } from './formDebug/formDebug.component';

@NgModule({
  declarations: [	
    AppComponent,
      TemplateFormComponent,
      DataFormtComponent,
      FormDebugComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
