import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-simulado-gerado',
  templateUrl: './simulado-gerado.component.html',
  styleUrls: ['./simulado-gerado.component.css']
})
export class SimuladoGeradoComponent implements OnInit {

  
  mode: ProgressBarMode = 'determinate';
  value = 0;

  constructor() { }

  ngOnInit(): void {
  }

  proxima(){
    this.value = this.value + 5;
  }

}
