import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {

  constructor(private gifSwervicio : GifsService) { }

  get resultado(){
     return this.gifSwervicio.resultados;
  }
  ngOnInit(): void {
  }

}
