import { AbstractControl, FormArray, ValidatorFn, FormControl } from '@angular/forms';

export class FormValidations {
  static  requiredMinCheckbox(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if(formArray instanceof FormArray) {
        const totalChecked = formArray.controls.map(values => values.value).reduce((total, atual) =>
          atual ? total + atual : total, 0)
        return totalChecked >= min ? null : {required: true}
      }
      throw new Error('formArray is not an instance of FormArray');
    }

    return validator
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
      if(cep && cep !== '') {
        const validaCep = /^[0-9]{8}$/;
        return validaCep.test(cep) ? null : {cepInvalido: true}
      }
      return null
  }
}
