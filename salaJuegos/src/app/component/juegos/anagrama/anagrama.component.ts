import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {

  listaPalabras : Array<string> = ['HOLA', 'CHAU', 'PERRO', 'GATO', 'CONEJO', 'SALUDO', 'BICICLETA', 'AUTO'];
  frs : string = '';
  palabra : Array<string> = [];
  palabraDesordenada : Array<string> = [];
  solucion : Array<string> = [];
  icon : any = {};
  letterWidth = 62;
  boxWidth : string = '';
  data: any = null;
  jugo: boolean = false;

  constructor(
    private sesion: SesionService,
  ) { }

  ngOnInit(): void {
    this.solucion = [];
    this.icon.name = 'clear';
    this.icon.color = 'red';
    this.palabra = this.getCharList(this.listaPalabras[this.getRandomInt(this.listaPalabras.length)]);
    this.frs = this.prepareFrs();
    this.palabraDesordenada = this.shuffle(this.palabra);
    this.boxWidth = (this.letterWidth * this.palabra.length) + 'px';
    this.data = this.sesion.userFireInfo.data();
    this.data.anagrama_partidas++;
    this.sesion.updateFireInfo(this.data);
  }
  getRandomInt(max : number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  getCharList(word : string) : Array<string>{
    let letters : Array<string> = [];
    let len : number = word.length;
    for(let i = 0 ; i < len; i++){
      letters.push(word.charAt(i));
    }
    return letters;
  }
  prepareFrs() : string{
    let fr : string = '';
    let len : number = this.palabra.length;
    for(let i = 0; i < len; i++){
      fr += ' 1fr';
    }
    return fr;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    if(!this.jugo){
      if(this.checkAnswer()){
        this.jugo = true;
        this.icon.name = 'check';
        this.icon.color = 'green';
        this.data.anagrama_victorias++;
        this.sesion.updateFireInfo(this.data);
      }else{
        this.icon.name = 'clear';
        this.icon.color = 'red';
      }
    }
  }
  shuffle(a : Array<string>) {
    let b : Array<string> = [];
    a.forEach((elem)=>{
      b.push(elem);
    });
    let j;
    let x;
    let i;
    for (i = b.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = b[i];
        b[i] = b[j];
        b[j] = x;
    }
    return b;
  }
  checkAnswer() : boolean{
    let ok = false;
    if(this.solucion.length == this.palabra.length){
      ok = true;
      for(let i = 0; i < this.palabra.length; i++){
        if(this.solucion[i] != this.palabra[i]){
          ok = false;
          break;
        }
      }
    }
    return ok;
  }
  redo(){
    this.jugo = false;
    this.ngOnInit();
  }
}
