import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salaJuegos';
  activeLink : string;
  links : Array<any> = [
    {route:"/home", alias:"Home"},
    {route:"/juegos", alias:"Juegos"},
    {route:"/acerca-de", alias:"Acerca de"}
  ];

  ngOnInit(){
    this.activeLink = '';
  }

  activeLinkChange(link : string){
    this.activeLink = link;
  }

}
