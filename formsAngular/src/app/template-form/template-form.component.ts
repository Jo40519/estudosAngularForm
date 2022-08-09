import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  public usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  onSubmit(form: any) {
    console.log(form)

    console.log(this.usuario)
  }

  consultaCEP(cep: any) {
   cep = cep.replace(/\D/g, '')

   if(cep != "") {
    let validaCep = /^[0-9]{8}$/;

    if(validaCep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`).pipe(map((dados) => dados)).subscribe((dados) => console.log(dados))
    }
   }
  }

  populaDadosForm() {
    
  }
}
