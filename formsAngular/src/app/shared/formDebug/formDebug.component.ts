import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-formDebug',
  templateUrl: './formDebug.component.html',
  styleUrls: ['./formDebug.component.scss']
})
export class FormDebugComponent implements OnInit {


  @Input() form: any;
  @Output() formChange = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

}
