import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {

  opciones : Array<any> = [
    {valor:'piedra', ruta:'../../../../assets/juegos-ppt-assets-piedra.svg', alt:'piedra'},
    {valor:'papel', ruta:'../../../../assets/juegos-ppt-assets-papel.svg', alt:'papel'},
    {valor:'tijera', ruta:'../../../../assets/juegos-ppt-assets-tijera.svg', alt:'tijera'}];
  pensando : any = {valor:'pensando', ruta:'../../../../assets/pensando.png', alt:'pensando'};
  seleccionUsuario : any = this.pensando;
  seleccionOponente : any = this.pensando;
  alias : Array<string> = ['Wachin', 'Turro', 'Amigo', 'ndeah', 'Master', 'Bro', 'Rey', 'Idolo'];
  mensaje : string = "Seleccione una opcion";

  constructor() { }

  ngOnInit(): void {
  }

  opcionElegida(elecion : string){
    
    if(elecion == 'piedra'){
      this.seleccionUsuario = this.opciones[0];
      this.oponenteElige();
      this.resolverBatalla();
    }else if(elecion == 'papel'){
      this.seleccionUsuario = this.opciones[1];
      this.oponenteElige();
      this.resolverBatalla();
    }else if(elecion == 'tijera'){
      this.seleccionUsuario = this.opciones[2];
      this.oponenteElige();
      this.resolverBatalla();
    }else{
      this.mensaje = 'Que onda ' + this.alias[Math.floor(Math.random() * this.alias.length)] + ' eso no se hace.';
    }
  }
  oponenteElige(){
    this.seleccionOponente = this.opciones[Math.floor(Math.random() * this.opciones.length)];
  }
  resolverBatalla(){
    let resultado : string = 'Hiciste cagada ';
    if(this.seleccionUsuario.valor == 'piedra'){
      switch(this.seleccionOponente.valor){
        case 'piedra':
          resultado = 'Empataste ';
          break;
        case 'papel':
          resultado = 'Perdite ';
          break;
        case 'tijera':
          resultado = 'Ganaste ';
          break;
      }
    }else if(this.seleccionUsuario.valor == 'papel'){
      switch(this.seleccionOponente.valor){
        case 'piedra':
          resultado = 'Ganaste ';
          break;
        case 'papel':
          resultado = 'Empataste ';
          break;
        case 'tijera':
          resultado = 'Perdiste ';
          break;
      }
    }else if(this.seleccionUsuario.valor == 'tijera'){
      switch(this.seleccionOponente.valor){
        case 'piedra':
          resultado = 'Perdiste ';
          break;
        case 'papel':
          resultado = 'Ganaste ';
          break;
        case 'tijera':
          resultado = 'Empataste ';
          break;
      }
    }else{
      this.mensaje = "Tenes que elegir";
    }
    this.mensaje = resultado + this.alias[Math.floor(Math.random() * this.alias.length)];

  }

}
