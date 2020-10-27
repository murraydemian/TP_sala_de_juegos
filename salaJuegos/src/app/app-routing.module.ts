import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AnagramaComponent } from './component/juegos/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './component/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guard/login.guard';
import { TatetiComponent } from './component/juegos/tateti/tateti.component';
import { AdivinaComponent } from './component/juegos/adivina/adivina.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    canActivate: [LoginGuard],
    path:'acerca-de',
    component: AcercaDeComponent
  },
  {
    canActivate: [LoginGuard],
    path:'juegos',
    component: JuegosComponent,
    children: [
      {path:'anagrama', component: AnagramaComponent, canActivate: [LoginGuard]},
      {path:'piedrapapeltijera', component: PiedraPapelTijeraComponent, canActivate: [LoginGuard]},
      {path:'tateti', component: TatetiComponent, canActivate: [LoginGuard]},
      {path:'adivina', component: AdivinaComponent, canActivate: [LoginGuard]},
    ],
  },
  {
    path:'login',
    component: LoginComponent,
    
  },
  {
    path:'registro',
    component: RegistroComponent,
  },
  {
    path:'**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
