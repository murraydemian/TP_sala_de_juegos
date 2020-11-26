import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  @Input() juego : string;
  @Input() estadisticas: Array<{nombre: string, valor: any}>;

  constructor() { }

  ngOnInit(): void {
  }

}
