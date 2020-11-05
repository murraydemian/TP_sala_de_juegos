import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SesionService } from 'src/app/service/sesion.service';
import { UserService } from 'src/app/service/user.service';

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
  ready: boolean = true;

  constructor(
    private sesion: SesionService,
    private fire: AngularFirestore,
  ) { }

  ngOnInit(): void {
    
  }

  opcionElegida(elecion : string){
    if(this.ready){
      this.ready = false;
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
      setTimeout(()=>{
        this.ready = true;
      },1000);
    }

  }
  oponenteElige(){
    this.seleccionOponente = this.opciones[Math.floor(Math.random() * this.opciones.length)];
  }
  async resolverBatalla(){
    let jugo = false;
    let resultado : string = 'Hiciste cagada ';
    if(this.seleccionUsuario.valor == 'piedra'){
      jugo = true;
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
      jugo = true;
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
      jugo = true;
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
    if(jugo){
      let data = this.sesion.userFireInfo.data();
      data.ppt_partidas++;
      if(resultado == 'Ganaste '){
        data.ppt_victorias++;
      }
      this.sesion.updateFireInfo(data);
    }
    
  }

}
