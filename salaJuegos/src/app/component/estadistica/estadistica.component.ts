import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  @Input() tipo : string;

  constructor() { }

  ngOnInit(): void {
  }

}
