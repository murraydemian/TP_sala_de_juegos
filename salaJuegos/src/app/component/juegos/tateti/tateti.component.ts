import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {

  public mensaje: string = 'Seleccione';
  public resultado: any = {};
  
  public espacios: Array<any> = [
    {img: '', foo:'primera'},
    {img: '', foo:'segunda'},
    {img: '', foo:'tercera'},
    {img: '', foo:'cuarta'},
    {img: '', foo:'quinta'},
    {img: '', foo:'sexta'},
    {img: '', foo:'septima'},
    {img: '', foo:'octava'},
    {img: '', foo:'novena'}];
    
  constructor(
    private sesion: SesionService,
    private fire: AngularFirestore,
    ) { }

  ngOnInit(): void {
  }

  selecciona(seleccion : number, tipo: string = 'tic'){
    if(this.espacios[seleccion].img == '' && !this.resultado.fin){
      if(seleccion >= 0 && seleccion <= 8){
        this.espacios[seleccion].img = tipo;
      }
      this.resultado = this.verificaVictoria();
      if(!this.resultado.fin && tipo == 'tic'){
        this.oponenteSelecciona();
      }
      if(this.resultado.fin){
        let data = this.sesion.userFireInfo.data();
        data.tateti_partidas++;
        if(this.resultado.ganador == 'tic'){
          data.tateti_victorias++;
          this.mensaje = 'Ganaste!';
        } else if (this.resultado.ganador == 'tac'){
          this.mensaje = 'Perdiste :(';
        } else {
          this.mensaje = 'Empate.';
        }
        this.sesion.updateFireInfo(data);
      }
    }
  }
  oponenteSelecciona(){
    let opciones: Array<number> = [];
    for(let i = 0; i < this.espacios.length; i++){
      if(this.espacios[i].img == ''){
        opciones.push(i);
      }
    }
    this.selecciona(opciones[Math.floor(Math.random() * opciones.length)], 'tac');
  }
  verificaVictoria() : any{
    let resultado: any = {fin: true, ganador: ''};
    for(let i = 0; i < this.espacios.length; i++){if(this.espacios[i].img == ""){resultado.fin = false}}
    let combinaciones: Array<Array<number>> = [
      [0, 1 ,2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [6, 4, 2]];
    for(let i = 0; i < combinaciones.length; i++){
      if(this.espacios[combinaciones[i][0]].img != "" 
      && this.espacios[combinaciones[i][0]].img == this.espacios[combinaciones[i][1]].img
      && this.espacios[combinaciones[i][0]].img == this.espacios[combinaciones[i][2]].img){
        resultado.fin = true;
        resultado.ganador = this.espacios[combinaciones[i][0]].img;
        break;
      }
    }
    return resultado;
  }
  reiniciar(){
    this.espacios.forEach( item => { item.img = '' });
    this.resultado.fin = false;
    this.resultado.ganador = '';
  }

}
