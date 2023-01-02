import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<any>('assets/dados/estados-br.json')
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'JR', desc: 'DevJr'},
      {nome: 'Dev', nivel: 'PL', desc: 'DevPl'},
      {nome: 'Dev', nivel: 'SR', desc: 'DevSr'}
    ]
  }

  getTecnologias() {
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'java script', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'},
    ]
  }

  getNewsLetter() {
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'},
    ]
  }
}
