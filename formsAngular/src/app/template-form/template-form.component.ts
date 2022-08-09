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

  consultaCEP(cep: any, form: any) {
   cep = cep.replace(/\D/g, '')

   if(cep != "") {
    let validaCep = /^[0-9]{8}$/;

    if(validaCep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`).pipe(map((dados) => dados)).subscribe((dados) => this.populaDadosForm(dados, form))
    }
   }
  }

  populaDadosForm(dados: any, form: any) {

    // form.setValue({
    //   nome: null,
    //   email: null,
    //   endereco: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // })

    form.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
         numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

  }
}
