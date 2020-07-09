import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    //Adiciona a tag do corpo do formulário de classe, para alterar o background-color
    this._document.body.classList.add('bodybg-color');
  }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe 
    this._document.body.classList.add('bodybg-color');
  }

}
