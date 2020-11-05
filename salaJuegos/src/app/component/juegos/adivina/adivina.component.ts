import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-adivina',
  templateUrl: './adivina.component.html',
  styleUrls: ['./adivina.component.scss']
})
export class AdivinaComponent implements OnInit {

  public dificultad : string = '';
  public eleccion: number = 0;
  private numero: number;
  public fecha: number;
  public tiempo: any = 0;
  public delta;
  public minutos;
  public segundos;
  public segundosString : string;
  public timer;
  public sancion = false;
  public maximo: number = 100;
  public minimo: number = 0;
  public empezo : boolean = false;
  public mensaje : string = '';
  public guia : string;
  public jugo: boolean = false;
  private userData: any = null;

  constructor(
    private sesion: SesionService,
  ) { }

  ngOnInit(): void { 
    this.userData = this.sesion.userFireInfo.data();
  }
  empezar(){
    if(!this.jugo){
      this.fecha = Date.now();
      this.empezo = true;
      this.empezarTimer();
    } else {
      this.seleccionaDificultad(this.dificultad);
      this.jugo = false;
      this.empezar();
    }
  }

  empezarTimer(){
    this.timer = setInterval(() => {
      this.delta = this.fecha - Date.now();
      this.minutos = Math.abs(Math.floor( ( this.delta / 1000 ) / 60 ) ) - 1;
      this.minutos = this.minutos < 10 ? ('0' + <string>this.minutos) : this.minutos + '';
      this.segundos = Math.abs(this.delta/1000) % 60;
      this.segundosString = this.segundos < 10 ? ('0' + <string>this.segundos).substr(0,6) : (this.segundos + '').substr(0, 6);      
      this.tiempo = this.minutos + ' : ' + this.segundosString;      
    }, 50);
  }

  seleccionaDificultad(seleccion: string){
    this.dificultad = seleccion;
    switch(this.dificultad){
      case 'facil':
        this.numero = Math.floor(Math.random() * 11);
        this.maximo = 10;
        break;
      case 'medio':
        this.numero = Math.floor(Math.random() * 51);
        this.maximo = 50;
        break;
      default:
        this.numero = Math.floor(Math.random() * 101);
        this.maximo = 100;
        break;
    }
    this.mensaje = 'Elegiste ' + this.dificultad + '. Encontra el numero entre 0 y ' + this.maximo;
  }

  sumar(cantidad : number){
    let resultado = this.eleccion + cantidad;
    this.eleccion = resultado > this.maximo ? this.maximo : resultado < this.minimo ? this.minimo : resultado;
  }
  adivinar(){
    if(this.eleccion == this.numero){
      clearInterval(this.timer);
      this.mensaje = 'Felicidades. Ganaste!'
      this.guia = 'check';
      this.jugo = true;
      this.empezo = false;
      switch(this.dificultad){
        case 'facil':
          this.userData.adivina_facil_tiempos.push(this.tiempo);
        break;
        case 'medio':
          this.userData.adivina_medio_tiempos.push(this.tiempo);
        break;
        case 'dificil':
          this.userData.adivina_dificil_tiempos.push(this.tiempo);
        break;
      }
      this.sesion.updateFireInfo(this.userData);
    } else {
      this.sancionar();
      if(this.eleccion < this.numero){
        this.mensaje = 'Mas grande!';
        this.guia = 'expand_less';
      } else {
        this.mensaje = 'Mas chico!';
        this.guia = 'expand_more';
      }
    }
  }
  sancionar(){
    this.sancion = true;
    this.fecha -= 3000;
    setTimeout( () => {
      this.sancion = false;
    }, 1000 );
  }

}
