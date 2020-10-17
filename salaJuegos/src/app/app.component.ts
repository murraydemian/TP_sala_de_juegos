import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salaJuegos';

  links : Array<any> = [
    {route:"/", alias:"Home"},
    {route:"/juegos", alias:"Juegos"},
    {route:"/acerca-de", alias:"Acerca de"}
  ];
  activeLink = this.links[0].route;

}
