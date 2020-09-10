import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AcercaDeComponent } from './component/acerca-de/acerca-de.component';
import { JuegosComponent } from './component/juegos/juegos.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

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
    component: JuegosComponent
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
