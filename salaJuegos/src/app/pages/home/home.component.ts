import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userData: any = null;
  public estadisticasAnagrama;
  public estadisticasPPT;
  public estadisticasTaTeTi;
  public estadisticasAdivina;
  public estadisticasAgilidad;
  public estadisticasMemotest;
  public estadisticasClicker;
  public listo: boolean = false;

  constructor(
    private sesion: SesionService,
  ) { }

  ngOnInit(){
    if(!this.sesion.userFireInfo){
      setTimeout(()=>{this.ngOnInit()},1000);
    }else{
      this.userData = this.sesion.userFireInfo.data();
      this.prepararEstadisticas();
      this.listo = true;
    }
  }

  prepararEstadisticas(){
    this.estadisticasAnagrama = this.prepararAnagrama();
    this.estadisticasPPT = this.prepararPPT();
    this.estadisticasTaTeTi = this.prepararTaTeTi();
    this.estadisticasAdivina = this.prepararAdivina();
    this.estadisticasAgilidad = this.prepararAgilidad();
    this.estadisticasMemotest = this.prepararMemotest();
    this.estadisticasClicker = this.prepararClicker();
  }

  prepararAnagrama(): Array<{nombre:string, valor:any}> | boolean {
    let vic = this.userData.anagrama_victorias ? this.userData.anagrama_victorias : 0;
    let estadisticasAnagrama;
    if(this.userData.anagrama_partidas){
      let porcentaje = ((this.userData.anagrama_partidas / this.userData.anagrama_victorias)).toPrecision(3) + '%';
      estadisticasAnagrama = [
        {nombre: 'Partidas jugadas', valor: this.userData.anagrama_partidas},
        {nombre: 'Partidas ganadas', valor: vic},
        {nombre: 'Porcentaje de victorias', valor: porcentaje}
      ]
    } else {
      estadisticasAnagrama = false;
    }
    return estadisticasAnagrama;
  }

  prepararPPT(): Array<{nombre:string, valor:any}> | boolean {
    let vic = this.userData.ppt_victorias ? this.userData.ppt_victorias : 0;
    let estadisticasPPT;
    if(this.userData.ppt_partidas){
      let porcentaje = ((this.userData.ppt_partidas / this.userData.ppt_victorias)).toPrecision(3) + '%';
      estadisticasPPT = [
        {nombre: 'Partidas jugadas', valor: this.userData.ppt_partidas},
        {nombre: 'Partidas ganadas', valor: vic},
        {nombre: 'Porcentaje de victorias', valor: porcentaje}
      ]
    } else {
      estadisticasPPT = false;
    }
    return estadisticasPPT;
  }

  prepararTaTeTi(): Array<{nombre:string, valor:any}> | boolean {
    let vic = this.userData.tateti_victorias ? this.userData.tateti_victorias : 0;
    let estadisticasTaTeTi;
    if(this.userData.tateti_partidas){
      let porcentaje = ((this.userData.ppt_partidas / this.userData.tateti_victorias)).toPrecision(3) + '%';
      estadisticasTaTeTi = [
        {nombre: 'Partidas jugadas', valor: this.userData.tateti_partidas},
        {nombre: 'Partidas ganadas', valor: vic},
        {nombre: 'Porcentaje de victorias', valor: porcentaje}
      ]
    } else {
      estadisticasTaTeTi = false;
    }
    return estadisticasTaTeTi;
  }

  prepararAdivina(): Array<{nombre:string, valor:any}> | boolean {
    let estadisticasAdivina = [];
    estadisticasAdivina = this.prepararTiemposPorDificultad(estadisticasAdivina, this.userData.adivina_dificil_tiempos, 'dificil');
    estadisticasAdivina = this.prepararTiemposPorDificultad(estadisticasAdivina, this.userData.adivina_medio_tiempos, 'medio');
    estadisticasAdivina = this.prepararTiemposPorDificultad(estadisticasAdivina, this.userData.adivina_facil_tiempos, 'facil');
    if(estadisticasAdivina.length > 0){
      return estadisticasAdivina;
    } else {
      return false;
    }
  }

  prepararAgilidad(): Array<{nombre:string, valor:any}> | boolean {
    let estadisticasAgilidad = [];
    estadisticasAgilidad = this.prepararTiemposPorDificultad(estadisticasAgilidad, this.userData.agilidad_dificil_tiempos, 'dificil');
    estadisticasAgilidad = this.prepararTiemposPorDificultad(estadisticasAgilidad, this.userData.agilidad_medio_tiempos, 'medio');
    estadisticasAgilidad = this.prepararTiemposPorDificultad(estadisticasAgilidad, this.userData.agilidad_facil_tiempos, 'facil');
    if(estadisticasAgilidad.length > 0){
      return estadisticasAgilidad;
    } else {
      return false;
    }
  }

  prepararMemotest(){
    let estadisticasMemotest = [];
    estadisticasMemotest = this.prepararTiemposPorDificultad(estadisticasMemotest, this.userData.memotest_dificil_tiempos, 'dificil');
    estadisticasMemotest = this.prepararTiemposPorDificultad(estadisticasMemotest, this.userData.memotest_medio_tiempos, 'medio');
    estadisticasMemotest = this.prepararTiemposPorDificultad(estadisticasMemotest, this.userData.memotest_facil_tiempos, 'facil');
    if(estadisticasMemotest.length > 0){
      return estadisticasMemotest;
    } else {
      return false;
    }
  }

  prepararClicker(){
    if(this.userData.clicker_mejor){
      let estadisticasClicker = [];
      estadisticasClicker = [
        {nombre: 'Mejor puntaje', valor: this.userData.clicker_mejor},
        {nombre: 'Ultimo puntaje', valor: this.userData.clicker_ultimo},
      ];
      return estadisticasClicker;
    } else {
       return false;
    }
  }

  prepararTiemposPorDificultad(estadisticasAdivina: Array<any>, tiempos: Array<any>, dificultad: string){
    if(tiempos.length > 0){
      let len = tiempos.length;
      let mejor = tiempos[0];
      for(let i = 0; i < len; i++){
        if(tiempos[i] < mejor){
          mejor = tiempos[i];
        }
      }
      estadisticasAdivina.push(
        {nombre: 'Mejor tiempo en ' + dificultad, valor: mejor},
        {nombre: 'Ultimo timepo en ' + dificultad, valor: tiempos[len-1]}
      );
    }
    return estadisticasAdivina;
  }

}
