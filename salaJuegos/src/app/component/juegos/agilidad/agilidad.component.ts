import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-agilidad',
  templateUrl: './agilidad.component.html',
  styleUrls: ['./agilidad.component.scss']
})
export class AgilidadComponent implements OnInit {

  public dificultad : string = null;
  private userData: any = null;

  public color: string = '';
  private timer;
  private fecha;
  private delta;
  private minutos;
  private segundos;
  private segundosString;
  public tiempo : any = 0;

  public empezo: boolean = false;
  private sancion;
  public primerNumero: number;
  public segundoNumero: number;
  public operador: string;
  public resultado: number;
  public respuesta: number = 0;
  public mensaje: string;

  constructor(
    private sesion : SesionService,
  ) { }

  ngOnInit(): void {
    this.mensaje = "Presione comenzar";
    this.userData = this.sesion.userFireInfo.data();
    this.verificarArrays();
  }

  verificarArrays(){
    if(typeof this.userData.agilidad_facil_tiempos == 'undefined'){
      this.userData.agilidad_facil_tiempos = [];
    }
    if(typeof this.userData.agilidad_medio_tiempos == 'undefined'){
      this.userData.agilidad_medio_tiempos = [];
    }
    if(typeof this.userData.agilidad_dificil_tiempos == 'undefined'){
      this.userData.agilidad_dificil_tiempos = [];
    }
  }

  colorearMensaje(){
    switch(this.mensaje){
      case 'Correcto':
        this.color = "#00FF00";
        break;
      case 'Mal':
        this.color = "#FF0000";
        break;
      default:
        this.color = "#000000";
        break;
    }
  }

  seleccionaDificultad( dif : string = null) : void {
    this.dificultad = dif;
    switch(this.dificultad){
      case 'facil':
        let foo = this.elegirOperador();
        this.operador = foo ? '+' : '-';
        this.resultado = foo ? (this.primerNumero + this.segundoNumero) : (this.primerNumero - this.segundoNumero);
        break;

      case 'medio':
        this.operador = '*';
        this.resultado = this.primerNumero * this.segundoNumero;
        break;

      case 'dificil':
        this.operador = '%';
        this.resultado = this.primerNumero % this.segundoNumero;
        break;
      default:
        this.dificultad = null;
        break;
    }
  }

  generarNumero() : number{
    return Math.floor(Math.random() * 50) + 1;
  }

  elegirOperador() : boolean{
    let num = this.generarNumero();
    return num > 24;
  }

  empezarTimer() : void{
    this.timer = setInterval(() => {
      this.delta = this.fecha - Date.now();
      this.minutos = Math.abs(Math.floor( ( this.delta / 1000 ) / 60 ) ) - 1;
      this.minutos = this.minutos < 10 ? ('0' + <string>this.minutos) : this.minutos + '';
      this.segundos = Math.abs(this.delta/1000) % 60;
      this.segundosString = this.segundos < 10 ? ('0' + <string>this.segundos).substr(0,6) : (this.segundos + '').substr(0, 6);      
      this.tiempo = this.minutos + ' : ' + this.segundosString;      
    }, 50);
  }

  sancionar(){
    this.sancion = true;
    this.fecha -= 3000;
    setTimeout( () => {
      this.sancion = false;
    }, 1000 );
  }

  empezar(){
    this.mensaje = "Ingrese su respuesta";
    this.empezo = true;
    this.primerNumero = this.generarNumero();
    this.segundoNumero = this.generarNumero();
    this.seleccionaDificultad(this.dificultad);
    this.fecha = Date.now();
    this.empezarTimer();
  }

  resolver(){
    if(this.resultado == this.respuesta){
      clearInterval(this.timer);
      this.empezo = false;
      this.mensaje = "Correcto";
      this.agregarTiempo();
    } else {
      this.mensaje = "Mal";
      this.sancionar();
    }
    this.colorearMensaje();
  }

  agregarTiempo(){
    switch(this.dificultad){
      case 'facil':
        this.userData.agilidad_facil_tiempos.push(this.tiempo);
        break;

      case 'medio':
        this.userData.agilidad_medio_tiempos.push(this.tiempo);
        break;

      case 'dificil':
        this.userData.agilidad_dificil_tiempos.push(this.tiempo);
        break;
    }
    this.sesion.updateFireInfo(this.userData);
  }

}
