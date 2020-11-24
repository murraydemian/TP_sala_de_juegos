import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  private userData: any;

  public espalda: string = '../../../../assets/memotest/memotest-back.svg';
  private front: string = '../../../../assets/memotest/memotest-front-';

  private timer;
  private fecha;
  private delta;
  private minutos;
  private segundos;
  private segundosString;
  public tiempo : any = 0;
  private sancion;

  public empezo: boolean = false;

  public animando: boolean = false;
  public cartas: Array<any> = [];
  private volteadas: number = 0;
  private aRevisar: Array<number> = [];
  public dificultad: string = null;
  public mensaje: string = null;
  public colorMensaje: string = '#000000';
  public termino: boolean = false;

  constructor(
    private sesion : SesionService,
  ) { }

  ngOnInit(): void {
    this.userData = this.sesion.userFireInfo.data();
    this.verificarArrays();
  }

  verificarArrays(){
    if(typeof this.userData.memotest_facil_tiempos == 'undefined'){
      this.userData.memotest_facil_tiempos = [];
    }
    if(typeof this.userData.memotest_medio_tiempos == 'undefined'){
      this.userData.memotest_medio_tiempos = [];
    }
    if(typeof this.userData.memotest_dificil_tiempos == 'undefined'){
      this.userData.memotest_dificil_tiempos = [];
    }
  }

  agregarTiempo(){
    switch(this.dificultad){
      case 'facil':
        this.userData.memotest_facil_tiempos.push(this.tiempo);
        break;

      case 'medio':
        this.userData.memotest_medio_tiempos.push(this.tiempo);
        break;

      case 'dificil':
        this.userData.memotest_dificil_tiempos.push(this.tiempo);
        break;
    }
    this.sesion.updateFireInfo(this.userData);
  }

  seleccionaDificultad(dif: string = null){
    this.dificultad = dif;
    this.cartas = [];
    switch(dif){
      case 'dificil':
        this.cartas.push(
          {carta: 6, imagen: this.front + '6.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 6, imagen: this.front + '6.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 5, imagen: this.front + '5.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 5, imagen: this.front + '5.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false}
        );
      case 'medio':
        this.cartas.push(
          {carta: 4, imagen: this.front + '4.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 4, imagen: this.front + '4.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 3, imagen: this.front + '3.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 3, imagen: this.front + '3.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false}
        );
      case 'facil':
        this.cartas.push(
          {carta: 2, imagen: this.front + '2.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 2, imagen: this.front + '2.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 1, imagen: this.front + '1.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false},
          {carta: 1, imagen: this.front + '1.svg', mostrar: false, back: this.espalda, clase: 'carta', animado: false, correcta: false, volteada: false}
        );
        break;
      default:
        this.cartas = [];
        break;
    }
    this.cartas = this.shuffle(this.cartas);
  }

  cambiarDificultad(){
    this.dificultad = null;
    this.empezo = false;
  }

  animar(index: number){
    if(this.empezo && !this.cartas[index].animado){
      this.cartas[index].clase = "carta-animada";
      this.cartas[index].animado = true;
      setTimeout( () => {
        this.cartas[index].mostrar = !this.cartas[index].mostrar;
      }, 400);
      setTimeout( () => {
        this.cartas[index].clase = "carta";
        this.cartas[index].animado = false;
      }, 1000);
    }
  }

  voltear(index){
    if(this.volteadas < 2 && !this.animando){
      if(!this.cartas[index].volteada){
        this.aRevisar.push(index);
        this.animar(index);
        setTimeout( () => {this.animando = false}, 1000)
        this.cartas[index].volteada = true;
        this.volteadas++;
        if(this.volteadas == 2){
          setTimeout( () => {
            this.revisar();
          }, 1100);
        }
      }
    }
  }

  revisar(){
    if(this.cartas[this.aRevisar[0]].carta == this.cartas[this.aRevisar[1]].carta){
      this.cartas[this.aRevisar[0]].correcta = true;
      this.cartas[this.aRevisar[1]].correcta = true;
    } else {
      this.cartas[this.aRevisar[0]].volteada = false;
      this.cartas[this.aRevisar[1]].volteada = false;
      this.animar(this.aRevisar[0]);
      this.animar(this.aRevisar[1]);
    }
    let gano = true;
    for(let i = 0; i < this.cartas.length; i++){
      if(!this.cartas[i].correcta){
        gano = false;
        break;
      }
    }
    this.volteadas = 0;
    this.aRevisar = [];
    if(gano){
      this.victoria();
    }
  }

  victoria(){
    clearInterval(this.timer);
    this.mensaje = "Ganaste!! Tu tiempo: " + this.tiempo;
    this.colorMensaje = "#00EE00";
    this.empezo = false;
    this.agregarTiempo();
  }

  empezarTimer() : void{
    this.fecha = Date.now();
    this.timer = setInterval(() => {
      this.delta = this.fecha - Date.now();
      this.minutos = Math.abs(Math.floor( ( this.delta / 1000 ) / 60 ) ) - 1;
      this.minutos = this.minutos < 10 ? ('0' + <string>this.minutos) : this.minutos + '';
      this.segundos = Math.abs(this.delta/1000) % 60;
      this.segundosString = this.segundos < 10 ? ('0' + <string>this.segundos).substr(0,6) : (this.segundos + '').substr(0, 6);      
      this.tiempo = this.minutos + ' : ' + this.segundosString;    
    }, 50);
  }
  empezar(){
    this.mensaje = null;
    this.empezo = true;
    this.mostrarOcultarTodas();
    setTimeout( () => {
      this.mostrarOcultarTodas();
    }, 2000);
    setTimeout( () => {
      this.empezarTimer();
    }, 3000);
  }

  mostrarOcultarTodas(){
    for(let i = 0; i < this.cartas.length; i++){
      this.animar(i);
    }
  }
  ocultarErroneas(){
    for(let i = 0; i < this.cartas.length; i++){

    }
  }

  sancionar(){
    this.sancion = true;
    this.fecha -= 3000;
    setTimeout( () => {
      this.sancion = false;
    }, 1000 );
  }

  shuffle(a : Array<any>) {
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

}
