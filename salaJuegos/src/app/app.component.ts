import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  index;
  title = 'salaJuegos';
  activeLink : string;
  links : Array<any> = [
    {route:"/", alias:"Home"},
    {route:"/juegos", alias:"Juegos"},
    {route:"/acerca-de", alias:"Acerca de"}
  ];

  ngOnInit(){
    this.index = 1;
    this.activeLink = this.links[0].route;
  }

}
