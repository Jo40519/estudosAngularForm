import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  public usuario: any = {
    nome: 'João Vitor',
    email: 'joao@email.com'
  }

  constructor() { }

  ngOnInit() {
  }


  onSubmit(form: any) {
    console.log(form)

    console.log(this.usuario)
  }
}
