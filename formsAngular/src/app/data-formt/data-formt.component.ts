import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadosBR } from './models/estados-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Cargos } from './models/cargos';
import { Tecnologias } from './models/tecnologias';
import { FormValidations } from '../shared/form-validations';

@Component({
  selector: 'app-data-formt',
  templateUrl: './data-formt.component.html',
  styleUrls: ['./data-formt.component.css'],
})
export class DataFormtComponent implements OnInit {
  formulario!: FormGroup;
  listaEstadosBr!: Observable<EstadosBR[]>;
  cargos!: Array<Cargos>;
  tec!: Array<Tecnologias>;
  newLetterOp!: any[];
  frameworks = ['Angular', 'React', 'Vue']
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargos: [null],
      tecnologias: [null],
      newsletter: [null, Validators.required],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.listaEstadosBr = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.tec = this.dropdownService.getTecnologias()
    this.newLetterOp = this.dropdownService.getNewsLetter()
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1))
  }

  getFrameworksControl () {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  submit() {
    console.log(
      `FORMULÁRIO PEGANDO AQUI, MEU NOME É ${this.formulario.controls['nome'].value} E MEU EMAIL É ${this.formulario.controls['email'].value}`
    );
    console.log(this.formulario)

    let valueSubmit = Object.assign({}, this.formulario.value)
      valueSubmit = Object.assign(valueSubmit, {
        frameworks: valueSubmit.frameworks.map((v: any, i: any) => {
          v ? this.frameworks[i] : null
        }).filter(Boolean)
      })
    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .pipe(map((res) => res))
        .subscribe((dados) => {
          console.log(dados);
          //this.reset()
        });
    } else {
      this.verificaCampos(this.formulario);
    }
  }

  verificaCampos(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle!.markAsTouched();

      if (controle instanceof FormGroup) {
        this.verificaCampos(controle);
      }
    });
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep !== null && cep != '') {
      this.cepService
        .consultaCEP({ cep })
        .pipe(map((dados) => dados))
        .subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });

    this.formulario.get('nome')?.setValue('João Vitor');
    this.formulario.get('endereco.numero')?.setValue(119);
  }

  reset() {
    this.formulario.reset();
  }

  verificaValid(campo: string | (string | number)[]): boolean {
    return (
      !this.formulario.get(campo)?.valid && !this.formulario.get(campo)?.touched
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

  appCssError(campo: string | (string | number)[]) {
    return {
      'has-error': this.verificaValid(campo),
      'has-feedback': this.verificaValid(campo),
    };
  }

  setarCargo() {
    const cargo =  {nome: 'Dev', nivel: 'PL', desc: 'DevPl'}

    this.formulario.get('cargos')?.setValue(cargo)
  }

  setarTecnologia() {

    this.formulario.get('tecnologias')?.setValue(['java', 'java script', 'php'])
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }
}
