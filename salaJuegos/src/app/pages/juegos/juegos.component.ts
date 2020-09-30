import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  display : string = '';

  constructor() { }

  ngOnInit(): void {
  }
  seleccionaJuego(juego : string){
    this.display = juego;
  }

}
