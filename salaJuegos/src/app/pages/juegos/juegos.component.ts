import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  games : Array<any> = [
    {alias:"Anagrama", route:"anagrama"},
    {alias:"Piedra Papel Tijera", route:"piedrapapeltijera"},
    {alias:"TaTeTi", route:"tateti"},
    {alias:"Adivina el Numero", route:"adivina"}
  ];
  display : string = '';

  constructor() { }

  ngOnInit(): void {
  }
  seleccionaJuego(juego : string){
    this.display = juego;
  }

}
