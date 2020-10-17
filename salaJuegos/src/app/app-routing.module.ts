import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AnagramaComponent } from './component/juegos/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './component/juegos/piedra-papel-tijera/piedra-papel-tijera.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'acerca-de',
    component: AcercaDeComponent
  },
  {
    path:'juegos',
    component: JuegosComponent,
    children: [
      {path:'anagrama', component: AnagramaComponent},
      {path:'piedrapapeltijera', component: PiedraPapelTijeraComponent},
      {path:'tateti', component: AnagramaComponent},
      {path:'adivina', component: AnagramaComponent},
    ],
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
