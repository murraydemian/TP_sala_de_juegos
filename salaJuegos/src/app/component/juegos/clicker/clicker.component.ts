import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit {

  public color: string;
  public mensaje: string;
  public clicks: number = 0;

  public empezo: boolean = false;

  private timer;
  private fecha;
  private delta;
  private minutos;
  private segundos;
  private segundosString;
  public tiempo : any = 0;

  private userData;

  constructor(
    private sesion : SesionService,
  ) { }

  ngOnInit(): void {
    this.mensaje = "Una vez empezado el timer hace click en el centro lo mas rapido posible";
    this.color = "#ffffff";
    this.userData = this.sesion.userFireInfo.data();
    this.verificarUserData();
  }

  contar(){
    if(this.empezo){
      this.clicks++;    
      this.cambiarColor();
    }
  }

  verificarUserData(){
    if(typeof this.userData.clicker_mejor == 'undefined'){
      this.userData.clicker_mejor = 0;
    }
    if(typeof this.userData.clicker_ultimo == 'undefined'){
      this.userData.clicker_ultimo = 0;
    }
  }

  finaliza(){
    if(this.clicks > this.userData.clicker_mejor){
      this.userData.clicker_mejor = this.clicks;
    }
    this.userData.clicker_ultimo = this.clicks;
    this.sesion.updateFireInfo(this.userData);
  }

  cambiarColor(){
    this.color = '#' +
      (Math.floor(Math.random() * 239) + 16).toString(16) +
      (Math.floor(Math.random() * 239) + 16).toString(16) +
      (Math.floor(Math.random() * 239) + 16).toString(16);
  }

  empezar(){
    this.clicks = 0;
    this.color = "#ffffff";
    setTimeout( () => {
      this.mensaje = "Empezando en 3...";
    }, 1000);
    setTimeout( () => {
      this.mensaje = "Empezando en 2...";
    }, 2000);
    setTimeout( () => {
      this.mensaje = "Empezando en 1...";
    }, 3000);
    setTimeout( () => {
      this.mensaje = "Una vez empezado el timer hace click en el centro lo mas rapido posible";
      this.empezo = true;
      this.empezarTimer();      
    }, 4000);
  }

  empezarTimer() : void{
    this.fecha = Date.now() + 30000;
    this.timer = setInterval(() => {
      this.segundos = this.fecha - Date.now();
      this.tiempo = (this.segundos / 1000).toPrecision(3);
      if(this.tiempo <= 0){
        clearInterval(this.timer);
        this.tiempo = 0;
        this.empezo = false;
        this.finaliza();
      }
    }, 50);
  }

}
