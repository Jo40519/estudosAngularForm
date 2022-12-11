import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormtComponent } from './data-formt/data-formt.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {
    path: 'templateForm',
    component: TemplateFormComponent
  },
  {
    path: 'dataForm',
    component: DataFormtComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dataForm'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
