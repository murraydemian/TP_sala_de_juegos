import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userData: any = null;
  anagramaPartidas;
  anagramaVictorias;
  pptPartidas;
  pptVictorias;
  adivinaFacilTiempos;
  adivinaMedioTiempos;
  adivinaDificilTiempos;
  tatetiPartidas;
  tatetiVictorias;
  ultimoFacil;
  ultimoMedio;
  ultimoDificil;

  constructor(
    private sesion: SesionService,
  ) { }

  ngOnInit(){
    if(!this.sesion.userFireInfo){
      setTimeout(()=>{this.ngOnInit()},1000);
    }else{
      this.userData = this.sesion.userFireInfo.data();
      this.ultimoFacil = this.userData.adivina_facil_tiempos[this.userData.adivina_facil_tiempos.length -1];
      this.ultimoMedio = this.userData.adivina_medio_tiempos[this.userData.adivina_medio_tiempos.length -1];
      this.ultimoDificil = this.userData.adivina_dificil_tiempos[this.userData.adivina_dificil_tiempos.length -1];
    }
  }

}
