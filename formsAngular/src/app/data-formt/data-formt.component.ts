import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-formt',
  templateUrl: './data-formt.component.html',
  styleUrls: ['./data-formt.component.css'],
})
export class DataFormtComponent implements OnInit {
  formulario!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null,[ Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    });
  }

  submit() {
    console.log(
      `FORMULÁRIO PEGANDO AQUI, MEU NOME É ${this.formulario.controls['nome'].value} E MEU EMAIL É ${this.formulario.controls['email'].value}`
    );
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).pipe(map(res => res)).subscribe(dados => {console.log(dados)
    //this.reset()
  })
  }

  reset() {
    this.formulario.reset()
  }

  verificaValid(campo: string | (string | number)[]) {
    return !this.formulario.get(campo)?.valid && !this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email')
      if(campoEmail?.errors){
        return campoEmail?.errors['email'] && campoEmail.touched
      }
  }

  appCssError(campo: string | (string | number)[]) {
    return {
      'has-error': this.verificaValid(campo),
      'has-feedback': this.verificaValid(campo)
    }
  }
}
