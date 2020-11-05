import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SesionService } from './service/sesion.service';
import { UserService } from './service/user.service';

export const routes : Array<any> = [
  {route:"/home", alias:"Home"},
  {route:"/juegos", alias:"Juegos"},
  {route:"/acerca-de", alias:"Acerca de"}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'salaJuegos';
  public activeLink : string;
  links : Array<any> = routes;
  public sesion : boolean = false;
  public procesando: boolean = false;

  constructor(
    private sesionService: SesionService,
    private router: Router,
  ){}

  ngOnInit(){
    this.activeLink = '';
    this.verificarSesion();
  }

  activeLinkChange(link : string){
    this.activeLink = link;
  }

  verificarSesion(){
    this.procesando = true;
    setTimeout( () => {
      this.sesionService.Started()
      .then( ( sesionStarted: boolean ) => {
        this.sesion = sesionStarted;
        this.procesando = false;
      })
      .catch( ( sesionStarted ) => {
        this.sesion = sesionStarted;
        this.procesando = false;
      });
    }, 1000);
  }

  cerrarSesion(){
    this.sesionService.End();
    this.verificarSesion();
    this.navegarHome();
  }

  navegarHome(){
    this.router.navigate(['/home']);
    this.activeLink = 'home';
  }


}
